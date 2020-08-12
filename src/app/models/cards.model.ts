import { Card } from "./card.model";

export class Cards {
    success: boolean;
    cards: Array<Card>;
    deck_id:String;
    remaining: Number
    constructor(deck_id:String){
        this.success = true;
        this.cards = [];
        this.deck_id=deck_id;
        this.remaining = 0;
    }
}
