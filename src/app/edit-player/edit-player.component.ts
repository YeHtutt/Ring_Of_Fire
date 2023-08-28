import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {

  allProfilePictures = ['1.png', '2.jpg' , '3.webp', '4.jpg', '5.png', '6.webp', '7.jpg', '8.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>,) {

  }

  onNoClick() {
    this.dialogRef.close();
  }
}
