import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cards } from './models/cards.model';

@Injectable({
  providedIn: 'root'
})
export class CardsApiService {

  constructor(private http: HttpClient) { }

  drawACard(howManyCards : Number, deck_id:String){
    return this.http.get<Cards>(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${howManyCards}`);
  }
  newDeck(){
    return this.http.get(`https://deckofcardsapi.com/api/deck/new/`);
  }
  shuffleCards(deck_id:String){
    return this.http.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
  }
}
