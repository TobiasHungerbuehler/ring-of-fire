import { Component } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, docData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameInterface } from '../interfaces/game.interfaces';
import { Game } from '../models/game';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root' // Provide the service at the root level
})

export class FirebaseService {
  //gameData: GameInterface[] = [];
  gameConnection: any;
  gameId: string = '4EBAfhOlFipBDRXr3x2u'; // Ersetzen Sie dies mit der gewünschten ID
  firestore: Firestore = inject(Firestore);


  constructor(private router: Router,) {
    //console.log('Game start zustand:', Game)
    //console.log('gameData', this.gameData)
    
  }
  


  loadFromServer(game: Game, gameId: string) {


    const gameRef = doc(this.firestore, 'games-db', gameId);
    this.gameConnection = docData(gameRef);
  
    this.gameConnection.subscribe((gameData: any) => {
      console.log('Spieler:', gameData); // Ausgabe des Spieler-Arrays

       game.currentPlayer = gameData.game.currentPlayer;
      // game.players = gameData.game.players;
      // game.stack = gameData.game.stack;
      // game.playedCards = gameData.game.playedCards;

      console.log('Game nach update:', game.currentPlayer)
    });

  }
  

  addGame(game: GameInterface) {
      addDoc(collection(this.firestore, 'games-db'), { game: this.getCleanJson(game) })
        .then((gameId) => {
          console.log('new game ID =', gameId);
          
          this.router.navigateByUrl('game/' + gameId.id);

        })
        .catch(error => {
          console.error('Fehler beim Hinzufügen des Testobjekts:', error);
        });
  }

  async updateGame(path: string, game: GameInterface){
    if(path){
      console.log(path, game)
      const ref = `games-db/${path}`;
      await updateDoc(doc(this.firestore, ref), this.getCleanJson(game)).catch(
        (err) => {console.error(err);}
      ).then();
    }
  }
  


  getCleanJson(game: GameInterface){
    return {
      players: game.players,
      stack: game.stack,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer
    }
  }






}




