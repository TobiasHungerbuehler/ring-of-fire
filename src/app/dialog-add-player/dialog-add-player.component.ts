import { Component } from '@angular/core';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatDialogModule,
            FormsModule,
            MatDialogContent,
            MatFormFieldModule,
            MatInputModule
          ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {

  name:string = '';

  onNoClick(){

  }







}
