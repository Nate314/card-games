import { Card } from "./Card";
import { CardSuit } from "./CardSuit";

export class Deck {

    _Cards: Card[] = [];
    set Cards(cards: Card[]) {
        this._Cards = cards;
        this.size = cards.length;
    }
    get Cards(): Card[] {
        return this._Cards;
    }
    size: number;

    constructor() {
        const oneToThirteen = Array(13).fill(null).map((v, i) => i + 1);
        [CardSuit.CLUBS, CardSuit.HEARTS, CardSuit.SPADES, CardSuit.DIAMONDS].forEach(suit => {
            this.Cards = this.Cards.concat(oneToThirteen.map(v => new Card(suit, v)));
        });
        this.size = this.Cards.length;
    }

    public shuffle(amount?: number) {
        const now = new Date().getTime();
        Array(amount ? amount : this.size * this.size * 2).fill('').forEach(() => {
            const position = Math.floor(Math.random() * this.size);
            const bottom = this.Cards.splice(position);
            const top = this.Cards;
            const card = this.Cards.pop();
            if (card) {
                this.Cards = [card].concat(top).concat(bottom);
            } else {
                this.Cards = top.concat(bottom);
            }
        });
    }
}
