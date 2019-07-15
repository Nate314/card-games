import { CardSuit } from "./CardSuit";

export class Card {

    suit: CardSuit;
    value: number;
    displayedValue: string;

    constructor(suit: CardSuit, value: number) {
        this.suit = suit;
        this.value = value;
        switch (value) {
            case 1:
                this.displayedValue = 'Ace';
                break;
            case 11:
                this.displayedValue = 'Jack';
                break;
            case 12:
                this.displayedValue = 'Queen';
                break;
            case 13:
                this.displayedValue = 'King';
                break;
            default:
                this.displayedValue = `${value}`;
        }
    }
}
