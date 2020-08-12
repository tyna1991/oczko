import { Component, OnInit } from '@angular/core';
import { GameMode } from './models/game-mode.model';
import { PlayersInformationService } from './players-information.service';
import { GameInformationService } from './game-information.service';
import { GameStatus } from './models/game-status.model';
import { Game } from './models/game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'blackjack-app';
  gameStatus:GameStatus = GameStatus.END_GAME;

  constructor(private playersInformationService: PlayersInformationService, private gameInformationService: GameInformationService){}
  ngOnInit(){
    this.gameInformationService.getGame().subscribe((game : Game)=>{
      this.gameStatus = game.gameStatus;
  })

  }
  chooseGameModeMultiplayer(){
    let modal  = document.getElementById('modal_multiplayer')
    modal.classList.remove('hidden')
    modal.classList.add('show');
  }
  chooseGameModeSingleplayer(){
    this.gameInformationService.createGame(GameMode.singlePlayer);
    this.playersInformationService.createPlayers(2);
    this.gameInformationService.startAGame();
  }
}
