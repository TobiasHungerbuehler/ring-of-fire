import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  
  pickCardAnimation = false;
  currentCard : string = '';
  game: Game = null!;
  playedCard: string = ''

  constructor(){
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
      
      setTimeout(()=>{
        this.game.playedCards.push(card);
        this.pickCardAnimation = false;
      },1000)

    }
  }







}
