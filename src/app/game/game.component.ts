import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, 
            PlayerComponent, 
            MatButtonModule, 
            MatIconModule,
            MatDialogModule,
            DialogAddPlayerComponent,  
            GameInfoComponent,
          ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  
  pickCardAnimation = false;
  currentCard : string = '';
  game: Game = null!;
  playedCard: string = ''
  
  constructor(private dialog: MatDialog){
    this.newGame()
  }

  newGame(){
   this.game = new Game();
  }
  
  takeCard(){
    const card = this.game.stack.pop();
    if (card !== undefined && !this.pickCardAnimation) {
      this.currentCard = card;
      this.pickCardAnimation = true; 
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(()=>{
        this.game.playedCards.push(card);
        this.pickCardAnimation = false;
      },1000)

    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);      

    dialogRef.afterClosed().subscribe((name:string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
      }
      });
  }









}
