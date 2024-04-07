import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { FirebaseService } from '../firebase-service/firebase-service';

import { GameInterface } from '../interfaces/game.interfaces';
import { ActivatedRoute } from '@angular/router';


import { Subscription } from 'rxjs';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, 
            PlayerComponent, 
            MatButtonModule, 
            MatIconModule,
            MatDialogModule,
            DialogAddPlayerComponent,  
            GameInfoComponent
          ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  
  pickCardAnimation = false;
  currentCard : string = '';
  game: Game = null!;
  playedCard: string = ''
  gameId: string = '';
  unsubscribe: any;
  
  constructor(private dialog: MatDialog, private firebaseService: FirebaseService, private routeId: ActivatedRoute){
  }
  
  ngOnInit(){
    this.idFromURL()
  }
  
  idFromURL(){
    this.routeId.params.subscribe((params) => { 
      this.gameId = params['id'];
      console.log('die gameId',this.gameId)
      this.startGame()
    })
    
  }
  
  
  startGame(){
    this.game = new Game()
    
    this.firebaseService.loadGame(this.game);

    //this.firebaseService.addGame(this.game);

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
    this.firebaseService.updateGame(this.gameId, this.game);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);      

    dialogRef.afterClosed().subscribe((name:string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
      }
      });
  }


  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe.unsubscribe();
    }
  }






}
