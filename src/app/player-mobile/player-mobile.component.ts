import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent {
  @Input() name;
  @Input() playerActive = false;
  @Input() profileImage = '1.png'; //ProfilBild Variable wird definiert und default mit 1.png übergeben
}
