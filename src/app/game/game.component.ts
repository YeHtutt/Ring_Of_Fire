import { Component, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


import { AngularFirestore } from '@angular/fire/compat/firestore'; //richtige library einbinden für "AngularFirestore"
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  game: Game; //game Instanz definiert
  gameId: string;


  /** route: ActivatedRoute -> Ermöglicht den Zugriff auf Informationen über eine Route, die mit einer Komponente verbunden ist, die in einen Ausgang geladen ist*/
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame(); //beim Laden wird die Methode des Model Instanzes aufgerufen

    this.route.params.subscribe((params) => { //man aboniert dieRoute um in richtige route mit id zu landen
      //console.log(params['id']);  //'params' - Ein Observable der Matrixparameter, die für diese Route gelten.
      this.gameId = params['id'];

       /**JSON updaten abbonieren */
    this.firestore
    .collection('games')
    .doc(params['id']).valueChanges()
    .subscribe((game: any)=> {
      //console.log('Game update', game);

      this.game.currentPlayer = game.currentPlayer;
      this.game.players = game.players;
      this.game.stack = game.stack;
      this.game.playedCards = game.playedCards;
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
      
    })

    });

  }

  newGame() {
    this.game = new Game(); //hier wird das Model objekt (Game-Klasse) zum game Component zugewisen/initialisiert
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop(); //currentCard bekommt den letzten Wert des Array (letzte Karte: String) aus der KartenHaufen
      this.game.pickCardAnimation = true;
      /*
      console.log('Game', this.game);
      console.log('current card: ', this.currentCard);
      */

      /** currentPlayer wird erhöht, damit man mit den gezogenen Karten den Current-Player vergleichen kann und playerActive= 'true' zu setzen 
       * und den Spieler orange zu markieren */
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame(); //nach dem pop() das Spiel einmal updaten od. speichern

      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);//gezogene Karte wird im playedCards Array gespeichert
        this.saveGame(); //nach dem push() das Spiel einmal updaten od. speichern
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);


    dialogRef.afterClosed().subscribe((name: string) => { //Wenn wir dialog schließen, dann hat name gar nicht ->kein String
      //console.log('The dialog was closed', name);
      if (name && name.length > 0) {  //daher erst mal name prüfen und dann name Länge prüfen
        this.game.players.push(name);
        this.saveGame(); //Hinzugefügte Spieler werden gespeichert
      }
    });

  }


  saveGame() { //es macht die Update Funktionen des Spieles
    this.firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJson());
  }

}
