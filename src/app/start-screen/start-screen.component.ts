import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase-service';
import { Game } from '../models/game';



@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private router: Router, private firestore: FirebaseService){}

  newGame(){
    let game = new Game;
    this.firestore.addGame(game);

  
    //this.router.navigateByUrl('game');
  }



}
