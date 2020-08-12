import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Input, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { PlayersInformationService } from '../players-information.service';
import { Player } from '../models/player.model';
import { SinglePlayerComponent } from '../single-player/single-player.component';
import { GameInformationService } from '../game-information.service';
import { GameStatus } from '../models/game-status.model';
import { CardsApiService } from '../cards-api.service';
import { Cards } from '../models/cards.model';
import { CardsValue } from '../models/cards-value.model';
import { Card } from '../models/card.model';
import { PlayerStatus } from '../models/player-status.model';
import { Game } from '../models/game.model';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css']
})
export class GameContainerComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private playersInformationService : PlayersInformationService, private cardsApiService : CardsApiService, private gameInformationService: GameInformationService) { }

  players:Player[];
  // activePlayerIndex: number = 0;
  componentsReferences= [];
  playersNumber:any = 0;
  activePlayerIndex = 0;
  loosersArray = [];
  winnersArray=[];
  game:Game;
  gameProgress:GameStatus = GameStatus.START_GAME;
  isRestart: Boolean = false;
  activePlayerComponent : SinglePlayerComponent;

  @ViewChild('singlePlayerContainer', { read: ViewContainerRef }) SPC: ViewContainerRef;


  ngOnInit() {
    this.gameInformationService.getGame().subscribe((game : Game)=>{
      this.game=game;
      })
        this.playersInformationService.getPlayers().pipe(takeUntil(this.ngUnsubscribe)).subscribe((players : Player[])=>{
          console.log(players)
          this.players=players;
            this.playersNumber = this.players.length;
            for(let i=0; i<this.players.length; i++){
              if(!this.isRestart){
              this.createComponent(this.players[i])
            }else{
              this.updateComponent(this.players[i]) 
            }
          }
          if(this.players.length){
            this.startAGameForEveryPlayer();
          }
        }); 
  }

  updateComponent(player : Player){
    let activePlayer = this.checkActivePlayer(player.index);
    activePlayer.activePlayer = false;
    activePlayer.player=player;
  }

  createComponent(player) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(SinglePlayerComponent);
    let componentRef: ComponentRef<SinglePlayerComponent> = this.SPC.createComponent(componentFactory);
    let currentComponent = componentRef.instance;
    componentRef.instance.player = player;
    currentComponent.compInteraction = this;
    this.componentsReferences.push(componentRef);
}

startAGameForEveryPlayer(){
    this.activePlayerComponent = this.checkActivePlayer(this.activePlayerIndex);
    this.activePlayerComponent.activePlayer = true;
    if(this.loosersArray.length===this.playersNumber-1){
      this.activePlayerComponent.player.status = PlayerStatus.winner;
      this.gameProgress = GameStatus.END_GAME;
    }else{
      this.drawCards(2);
    }
}

drawCards(howManyCards:Number){
  this.cardsApiService.drawACard(howManyCards, this.activePlayerComponent.player.cards.deck_id).subscribe((cardsResponse:Cards) => {
    let previousCards = this.activePlayerComponent.player.cards.cards;
    this.activePlayerComponent.player.cards = cardsResponse;
    this.activePlayerComponent.player.cards.cards = [...cardsResponse.cards, ...previousCards];
    this.updateScore(this.activePlayerComponent.player.cards.cards);
    if(howManyCards==2){
      this.checkIfPersianEye();
    }
    this.checkTheScore();
  })
}


checkActivePlayer(index): SinglePlayerComponent{
  let componentRef = this.componentsReferences.filter(x => x.instance.player.index == index)[0];
  let component: SinglePlayerComponent = <SinglePlayerComponent>componentRef.instance;
  
  return component;
}

updateScore(cards:Array<Card>){
  let tempScore=0;
  let enumCards = CardsValue;
  cards.forEach(card => {
    if(!isNaN(parseInt(card.value.toString()))){
     let cardValueToString = "0" + card.value;
     tempScore = tempScore + enumCards[cardValueToString];
    }else{
      let value = card.value.toString().toLowerCase();
      tempScore = tempScore + enumCards[value];
    }
  });
  this.activePlayerComponent.player.score = tempScore;
}

checkTheScore(){
  if(!(this.activePlayerComponent.player.status === (PlayerStatus.winner || PlayerStatus.looser)) && this.activePlayerComponent.player.score>21){
    this.activePlayerComponent.player.status = PlayerStatus.looser;
    this.loosersArray.push('true');
    this.standButtonSubmit();
  }
  if(this.activePlayerComponent.player.isBot && this.activePlayerComponent.player.score<=16){
    this.hitButtonSubmit();
  }
  else if(this.activePlayerComponent.player.isBot && this.activePlayerComponent.player.score>16){
    this.checkFinalResults();
  }
  if(!((this.activePlayerComponent.player.status === PlayerStatus.winner) || (this.activePlayerComponent.player.status === PlayerStatus.looser)) && this.activePlayerComponent.player.score===21){
    this.activePlayerComponent.player.status = PlayerStatus.winner;
    this.winnersArray.push('true');
    this.standButtonSubmit();
  }
  
}

checkIfPersianEye(){
  if(this.activePlayerComponent.player.cards.cards.filter(element=>{return element.value==="ACE"}).length==2){
    this.activePlayerComponent.player.status = PlayerStatus.winner;
  }
}

hitButtonSubmit(){
  if(this.gameProgress){
  this.drawCards(1);
  }
}

checkFinalResults(){
  let winningPlayer = {
            score: 0,
            index: 0
          }
  let winningPlayersArray;
  for(let i=0; i<this.playersNumber; i++){
    let currentPlayer: SinglePlayerComponent = this.checkActivePlayer(i);
    if(currentPlayer.player.status!=PlayerStatus.looser){
      if(currentPlayer.player.score>=winningPlayer.score){
        if(currentPlayer.player.score==winningPlayer.score){
          let winningPlayerNew = {
            score: currentPlayer.player.score as number,
            index: currentPlayer.player.index as number
          }
          winningPlayer = winningPlayerNew;
          winningPlayersArray=[...winningPlayersArray, winningPlayerNew];
        }else{
          let previousPlayer: SinglePlayerComponent = this.checkActivePlayer(winningPlayer.index);
          previousPlayer.player.status = PlayerStatus.looser;
          let winningPlayerNew = {
            score: currentPlayer.player.score as number,
            index: currentPlayer.player.index as number
          }
          winningPlayer = winningPlayerNew;
          winningPlayersArray=[];
          winningPlayersArray = [winningPlayerNew];
        }
      }else{
        currentPlayer.player.status = PlayerStatus.looser;
      }
    }
  } 
 winningPlayersArray.forEach(player => {
   this.checkActivePlayer(player.index).player.status=PlayerStatus.winner;
 });
}

standButtonSubmit(){
    if(this.gameProgress && !(this.activePlayerComponent.player.cards.cards.length===0)){
      if(this.winnersArray.length && this.activePlayerComponent.player.score!==21){
        this.activePlayerComponent.player.status = PlayerStatus.looser;
      }
      if(this.activePlayerIndex<this.playersNumber-1){
        this.activePlayerComponent.activePlayer = false;
        this.activePlayerIndex++
        this.startAGameForEveryPlayer()
      }else{
        this.gameProgress = GameStatus.END_GAME;
        this.checkFinalResults()
      }
    }
}
resetGame(){
  this.loosersArray=[];
  this.winnersArray=[];
  this.activePlayerIndex=0;
}
newPlay(){
  this.isRestart = true;
  this.resetGame();
  this.cardsApiService.newDeck().subscribe((cardsResponse : Cards)=>{
    this.cardsApiService.shuffleCards(cardsResponse.deck_id).subscribe((res)=>{
      this.playersInformationService.resetScore(cardsResponse.deck_id);
      this.gameProgress = GameStatus.START_GAME;
    });
  })
}
endAGame(){
  this.gameProgress = GameStatus.END_GAME;
  this.resetGame();
  this.playersInformationService.resetPlayers();
  this.gameInformationService.resetGame();
}
ngOnDestroy() {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}
}