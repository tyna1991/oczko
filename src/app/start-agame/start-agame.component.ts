import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { PlayersInformationService } from '../players-information.service';
import { Player } from '../models/player.model';
import { GameInformationService } from '../game-information.service';
import { GameMode } from '../models/game-mode.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-start-agame',
  templateUrl: './start-agame.component.html',
  styleUrls: ['./start-agame.component.css']
})
export class StartAGameComponent implements OnInit {

  playersInfo:any;
  players:Player[];
  isModalOpen : Boolean = false;
  names:FormArray;
  minNumberOfPlayers = 2;
  maxNumberOfPlayers = 4;
  @Input() selectedMode;
  @ViewChild(UserFormComponent) namesFormComponent:UserFormComponent;
  constructor(private formBuilder: FormBuilder, private playersInformationService : PlayersInformationService, private gameInformationService : GameInformationService) {
            this.playersInfo = this.formBuilder.group({
              number:this.minNumberOfPlayers
            })
  }

  ngOnInit() {
  }
  getNames(names:FormArray){
    this.names=names;
  }
  plus(){
    if(this.playersInfo.value.number<this.maxNumberOfPlayers){
      this.playersInfo.value.number++
      this.playersInfo['controls']['number'].setValue(this.playersInfo.value.number++);
    }
  }
  minus(){
    if(this.playersInfo.value.number!=this.minNumberOfPlayers){
      this.playersInfo.value.number--
      this.playersInfo['controls']['number'].setValue(this.playersInfo.value.number--);
    }
  }
  onSubmit(){
    this.namesFormComponent.onSubmit();
    if(this.names !== undefined){
      this.closeModal();
      console.log()
      this.playersInformationService.createPlayers(this.playersInfo.value.number, this.names.value);
      this.gameInformationService.createGame(GameMode.multiplayer);
      this.gameInformationService.startAGame();
    }
  }
  closeModal(){
    let modal_t  = document.getElementById('modal_multiplayer')
    modal_t.classList.remove('show')
    modal_t.classList.add('hidden');
  }
}
