import React from 'react';
import { Card } from '../typescript/Card';
import { CardSuit } from '../typescript/CardSuit';
import { Position } from '../typescript/Position';

export class CardComponentProps {
    text: string;
    Card: Card;
    show: boolean;
    position: Position;
    clicked: any;
    constructor(suit: CardSuit, value: number) {
        this.text = '';
        this.Card = new Card(suit, value);
        this.show = false;
        this.position = new Position(0, 0);
    }
}

export class CardComponent extends React.Component {

    static _cardSize: number = 100;
    static width: number = 100;
    static height: number = 150;
    static get cardSize(): number {
        return this._cardSize;
    }
    static set cardSize(value: number) {
        this.width = value;
        this.height = value * 1.5;
        this._cardSize = value;
    }

    props: CardComponentProps;

    constructor(props: CardComponentProps) {
        super(props);
        this.props = props;
    }

    render() {
        const size = CardComponent.cardSize;
        const width = CardComponent.width;
        const height = CardComponent.height;
        const fontSize = Math.sqrt(CardComponent.width) * 2;
        const value = this.props.Card.displayedValue;
        const suit = this.props.Card.suit === CardSuit.HEARTS ? <span>&#x2665;</span>
            : (this.props.Card.suit === CardSuit.CLUBS ? <span>&#x2663;</span>
            : (this.props.Card.suit === CardSuit.DIAMONDS ? <span>&#x2666;</span>
            : this.props.Card.suit === CardSuit.SPADES ? <span>&#x2660;</span> : ''));
        const cardColor = [CardSuit.HEARTS, CardSuit.DIAMONDS].includes(this.props.Card.suit) ? 'red' : 'black';
        return (
            <div>
                {
                    this.props.show ?
                    <div onClick={() => this.props.clicked()} style={{
                        position:'absolute', top:`${this.props.position.y}px`, left:`${this.props.position.x}px`,
                        width:`${width}px`, height:`${height}px`, padding:`${size / 10}px`,
                        fontSize:`${fontSize}px`, textAlign:'center',
                        borderStyle:'solid', borderColor:'black', backgroundColor:'white', color:cardColor}}>
                        {value}
                        <br />
                        <span style={{fontSize:`${width}px`}}>{suit}</span>
                    </div>
                    :
                    <div onClick={() => this.props.clicked()} style={{
                        position:'absolute', top:`${this.props.position.y}px`, left:`${this.props.position.x}px`,
                        width:`${width}px`, height:`${height}px`, padding:`${size / 10}px`,
                        fontSize:`${fontSize * 1.5}px`, textAlign:'center', color:'white',
                        borderStyle:'solid', borderColor:'black', backgroundColor:'blue'}}>
                            {this.props.text.split(' ').map(v =>
                                <div>
                                    <span>{v}</span>
                                    <br />
                                </div>
                            )}
                    </div>
                }
            </div>
        );
    }
}
