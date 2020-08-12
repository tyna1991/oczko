import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Player } from './models/player.model';
import { Observable } from 'rxjs/internal/Observable';
import { Cards } from './models/cards.model';
import { CardsApiService } from './cards-api.service';
import { PlayerStatus } from './models/player-status.model';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlayersInformationService {

private players = new BehaviorSubject<Player[]>([]);

deck_id : String

constructor(private cardsApi : CardsApiService) {
  
}

createPlayers(numberOfPlayers :Number, names?:FormArray){
  this.cardsApi.newDeck().subscribe((cardsResponse:Cards)=>{
    this.deck_id = cardsResponse.deck_id;
    this.cardsApi.shuffleCards(this.deck_id).subscribe(res=>{
      let players:Player[] = [];
    if(typeof names == 'undefined'){
      players.push({
        name:'ty',
        index:0,
        score:0,
        isBot:false,
        cards:new Cards(this.deck_id),
        status:PlayerStatus.undetermined
      });
      for(let i=1; i<numberOfPlayers; i++){
      players.push({
        name: 'gracz'+i,
        index:i,
        score:0,
        isBot: true,
        cards:new Cards(this.deck_id),
        status:PlayerStatus.undetermined
      })
    }
    }else{
      for(let i=0; i<numberOfPlayers; i++){
        players.push({
          name: names[i].name,
          index:i,
          score:0,
          isBot:false,
          cards:new Cards(this.deck_id),
          status:PlayerStatus.undetermined
        })
      }
    }
    
    let allPlayers : Player[] = players;
    this.players.next(allPlayers);
    });

  })
  
}  

resetScore(deck_id : String){
  let playersWithResetedScore : Player[] = this.players.value.map(player=>{
    return {...player, score : 0, cards: new Cards(deck_id), status:PlayerStatus.undetermined }
  })
  this.players.next(playersWithResetedScore)
}

resetPlayers() {
    this.players.next([]);
}

getPlayers(): Observable<any> {
    return this.players.asObservable();
}

}
