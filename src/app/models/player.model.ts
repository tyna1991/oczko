import { Cards } from "./cards.model";
import { PlayerStatus } from "./player-status.model";

export interface Player {
name?:String;
index:Number;
score:Number;
isBot:boolean;
cards:Cards;
status:PlayerStatus;
}
