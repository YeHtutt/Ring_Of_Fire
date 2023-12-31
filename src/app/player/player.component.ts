import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  @Input() name;
  @Input() playerActive = false;
  @Input() profileImage = '1.png'; //ProfilBild Variable wird definiert und default mit 1.png übergeben
}
