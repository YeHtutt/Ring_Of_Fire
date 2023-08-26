import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private router: Router) { /*initialisierung Router Service für die Seite Start-Screen*/

  }
  newGame() {
    //start game
    this.router.navigateByUrl('/game');  /*Ein Dienst, der die Navigation zwischen den Ansichten und die Möglichkeit der URL-Bearbeitung bietet.*/
  }
}
