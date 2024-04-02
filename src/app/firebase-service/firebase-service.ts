import { Component } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameInterface } from '../interfaces/game.interfaces';



@Injectable({
  providedIn: 'root' // Provide the service at the root level
})

export class FirebaseService {
  GameData$;
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.GameData$ = collectionData(collection(this.firestore, 'games-db'));

    //this.loadFromServer()
  }
  
  loadFromServer() {
    this.GameData$.subscribe(items => {
      console.log('Items aus der Datenbank:', items);
    });
  }

  addGame(game: GameInterface) {
    //console.log('geiler dude',this.getCleanJson(game))

    //  addDoc(collection(this.firestore, 'games-db'), { game: this.getCleanJson(game) })
    //    .then(() => {
    //      console.log('Testobjekt erfolgreich hinzugefügt!');
    //    })
    //    .catch(error => {
    //      console.error('Fehler beim Hinzufügen des Testobjekts:', error);
    //    });
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




