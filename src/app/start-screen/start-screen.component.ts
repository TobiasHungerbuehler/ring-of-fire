import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { FirebaseService } from '../firebase-service/firebase-service';



@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  gameId: any = '4EBAfhOlFipBDRXr3x2u'; // Ersetzen Sie dies mit der gewünschten ID

  constructor(private router: Router, private firebaseService: FirebaseService){}

  newGame() {
    let game = new Game();
    this.firebaseService.addGame(game).then(gameId => {
      this.router.navigateByUrl(`/game/${gameId}`);
    }).catch(error => {
      console.error('Fehler beim Erstellen eines neuen Spiels:', error);
      // Hier könntest du eine Benachrichtigung anzeigen oder eine andere Fehlerbehandlung durchführen
    });
  }
  



}
