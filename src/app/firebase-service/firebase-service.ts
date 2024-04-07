import { Component, OnDestroy } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, docData} from '@angular/fire/firestore';

import { GameInterface } from '../interfaces/game.interfaces';
import { Game } from '../models/game';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root' // Provide the service at the root level
})

export class FirebaseService {
  //gameData: GameInterface[] = [];
  gameConnection: any;
  
  firestore: Firestore = inject(Firestore);

  constructor() {

  }
  
  addGame(game: Game): Promise<string> {
    return addDoc(collection(this.firestore, 'games-db'), { game: this.getCleanJson(game) })
      .then(docRef => docRef.id) // Gib die ID des neu erstellten Dokuments zurück
      .catch(error => {
        console.error('Fehler beim Hinzufügen des Spiels:', error);
        throw error; // Wirf den Fehler weiter, um ihn in der Komponente behandeln zu können
      });
  }
  

  loadGame(game: Game, gameId: string) {
    const gameRef = doc(this.firestore, 'games-db', gameId);
    this.gameConnection = docData(gameRef);
  
    return this.gameConnection.subscribe((gameData: any) => {
      game.currentPlayer = gameData.game.currentPlayer;
      game.players = gameData.game.players;
      game.stack = gameData.game.stack;
      game.playedCards = gameData.game.playedCards;
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




