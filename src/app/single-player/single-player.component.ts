import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css'],
})
export class SinglePlayerComponent implements OnInit {

  public index: number;
  player:Player;
  activePlayer:Boolean = false;

  @HostBinding('class.single-player-2') isTwoPlayers: boolean = false;
  @HostBinding('class.single-player-3') isThreePlayers: boolean = false;
  @HostBinding('class.single-player-4') isFourPlayers: boolean = false;

  compInteraction : any;

  constructor() { 
  }

  ngOnInit() {
    if(this.compInteraction.playersNumber == 2) this.isTwoPlayers = true;
    if(this.compInteraction.playersNumber == 3) this.isThreePlayers = true;
    if(this.compInteraction.playersNumber == 4) this.isFourPlayers = true;
  }

}
