import { Injectable } from '@angular/core';
import { Game } from './models/game.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { GameMode } from './models/game-mode.model';
import { GameStatus } from './models/game-status.model';

@Injectable({
  providedIn: 'root'
})
export class GameInformationService {

  private _game : Game = {
    gameStatus:GameStatus.END_GAME,
    gameMode:GameMode.unsetted,
  }
  private game = new BehaviorSubject<Game>(this._game);


  constructor() { }

  createGame(mode:GameMode){
  this._game = {
    ...this._game,
    gameMode:mode
  }
  this.game.next(this._game);
}  

startAGame(){
  this.game.next({...this._game, gameStatus:GameStatus.START_GAME})
}

resetGame() {
    this.game.next({
      gameStatus:GameStatus.END_GAME,
      gameMode:GameMode.unsetted
    });
}

getGame(): Observable<any> {
    return this.game.asObservable();
}
}
