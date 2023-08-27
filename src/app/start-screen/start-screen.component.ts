import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: AngularFirestore, private router: Router) { /*initialisierung Router Service für die Seite Start-Screen*/

  }
  newGame() {//start game
    let game = new Game();

    /**JSON hinzufügen in Firebase app*/
    this.firestore
    .collection('games')
    .add(game.toJson())
    .then((gameInfo: any) => { //mit der Funktion wird zum Spiel mit unique Id hin-navigiert
      //console.log(gameInfo);
      this.router.navigateByUrl('/game/' + gameInfo.id);  /*Ein Dienst, der die Navigation zwischen den Ansichten und die Möglichkeit der URL-Bearbeitung bietet.*/
    });
  }
}
