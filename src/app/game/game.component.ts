import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game; //game Instanz definiert
  currentCard: string = '';

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame(); //beim Laden wird die Methode des Model Instanzes aufgerufen
  }

  newGame() {
    this.game = new Game(); //hier wird das Model objekt (Game-Klasse) zum game Component zugewisen/initialisiert

  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop(); //currentCard bekommt den letzten Wert des Array (letzte Karte: String) aus der KartenHaufen
      this.pickCardAnimation = true;

      /*
      console.log('Game', this.game);
      console.log('current card: ', this.currentCard);
      */

      /** currentPlayer wird erhöht, damit man mit den gezogenen Karten den Current-Player vergleichen kann und playerActive= 'true' zu setzen 
       * und den Spieler orange zu markieren */
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);//gezogene Karte wird im playedCards Array gespeichert
        this.pickCardAnimation = false;
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);


    dialogRef.afterClosed().subscribe((name: string) => { //Wenn wir dialog schließen, dann hat name gar nicht ->kein String
      //console.log('The dialog was closed', name);
      if (name && name.length > 0) {  //daher erst mal name prüfen und dann name Länge prüfen
        this.game.players.push(name);
      }
    });

  }

}
