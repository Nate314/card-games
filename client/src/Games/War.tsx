import React from 'react';
import { Deck } from '../CardGamesLibrary/typescript/Deck';
import { CardComponent } from '../CardGamesLibrary/react-components/CardComponent';
import { Position } from '../CardGamesLibrary/typescript/Position';

export class WarState {
    player1: Deck = new Deck();
    player2: Deck = new Deck();
    revealedCards: Deck = new Deck();
    winner: any = undefined;
    p1score: number = 26;
    p2score: number = 26;
    tieCounter: number = 0;
    turnCounter: number = 0;
}

export class War extends React.Component {

    state: WarState;

    constructor(props: any) {
        super(props);
        this.state = new WarState();
        const deck = new Deck();
        deck.shuffle();
        // this.state.player1.Cards = deck.Cards.splice(26);
        // this.state.player2.Cards = deck.Cards;
        this.state.player1.Cards = deck.Cards.filter((v, i) => i % 2 === 0);
        this.state.player2.Cards = deck.Cards.filter((v, i) => i % 2 === 1);
        console.log(this.state.player1.Cards);
        console.log(this.state.player2.Cards);
        this.state.revealedCards.Cards = [];
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyDown);
    }

    keyDown = (e: any) => {
        this.setState((state: WarState) => {
            if (((e === 'KeyS' || e.code === 'KeyS') && state.winner !== undefined) || e.code === 'Space' || e === ' ') {
                if (state.p1score === 0 || state.p2score === 0) {
                    // game over
                } else {
                    if (state.tieCounter === 0) {
                        state.revealedCards.Cards = [];
                    } else {
                        state.tieCounter--;
                    }
                    const p1Card = state.player1.Cards.pop();
                    const p2Card = state.player2.Cards.pop();
                    if (p1Card && p2Card) {
                        state.revealedCards.Cards.push(p1Card);
                        state.revealedCards.Cards.push(p2Card);
                        if (state.tieCounter === 0) {
                            state.turnCounter++;
                            state.winner = p1Card.value === p2Card.value ? undefined : (p1Card.value > p2Card.value);
                            if (state.winner === true) {
                                state.player1.Cards = state.revealedCards.Cards.concat(state.player1.Cards);
                            } else if (state.winner === false) {
                                state.player2.Cards = state.revealedCards.Cards.concat(state.player2.Cards);
                            } else if (state.winner === undefined) {
                                state.tieCounter = 4;
                            }
                        }
                    }
                    state.p1score = state.player1.Cards.length;
                    state.p2score = state.player2.Cards.length;
                }
            }
            return state;
        });
    }

    render() {
        // calculate x, y, width and heights for UI elements
        const length = (window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight) - 20;
        CardComponent.cardSize = length / 8;
        const cardWidth = CardComponent.width;
        const halfCardWidth = CardComponent.width * 0.4;
        const cardHeight = CardComponent.height;
        const tableHeight = cardHeight * 2;
        const p1x = halfCardWidth;
        const p2x = length - cardWidth - halfCardWidth;
        const p1y = length - cardHeight - halfCardWidth;
        const p2y = length - cardHeight - halfCardWidth;
        const revealedX = length / 2;
        const revealedY = halfCardWidth;
        // scores displayed on the card stacks
        const p1score = `P1 ${this.state.p1score}`;
        const p2score = `Comp ${this.state.p2score}`;
        // function used to get position for the card
        const getCardPosition = (i: number) => {
            let xResult = revealedX;
            const xOffset = halfCardWidth + ((Math.floor(i / 2) % 5) * halfCardWidth) + (Math.floor(i / 10) * 15);
            xResult += (i % 2 === 0) ? -1 * (xOffset + cardWidth) : xOffset;
            let yResult = revealedY;
            yResult += (Math.floor(i / 10) * 105) + ((Math.floor(i / 2) % 5) * halfCardWidth)
            return new Position(xResult, yResult);
        }
        return (
            <div style={{width:`${length}px`, height:`${length}px`, backgroundColor:'green'}}>
                {/* Revealed cards */}
                <div>
                    {
                        this.state.revealedCards.Cards.map((card, i) =>
                            <CardComponent Card={card} show={true} position={getCardPosition(i)}
                                clicked={() => undefined} key={`card_${i}`} text=""/>)
                    }
                </div>
                {/* Arrow */}
                <div style={{position:'absolute', top:`${revealedY + 150 + halfCardWidth}px`, left:`${revealedX - 50}px`, fontSize:'100px'}}>
                    {
                        this.state.winner === undefined ? <span>&harr;</span>
                        : (this.state.winner === true ? <span>&larr;</span>
                            : (this.state.winner === false ? <span>&rarr;</span> : ''))
                    }
                </div>
                {/* Table */}
                <div style={{position:'absolute', top:`${length - tableHeight}px`,
                    width:`${length}px`, height:`${tableHeight}px`, backgroundColor:'brown'}}>
                </div>
                {/* Player 1's cards */}
                <div>
                    {
                        this.state.player1.Cards.map((card, i) =>
                            <CardComponent Card={card} show={false} position={new Position(p1x, p1y)}
                                clicked={() => undefined} key={`card_${i}`} text={p1score}/>)
                    }
                </div>
                {/* Player 2's cards */}
                <div>
                    {
                        this.state.player2.Cards.map((card, i) =>
                            <CardComponent Card={card} show={false} position={new Position(p2x, p2y)}
                                clicked={() => undefined} key={`card_${i}`} text={p2score}/>)
                    }
                </div>
                {/* Score */}
                <div style={{position:'absolute', top:`${length - tableHeight + 10}px`, left:`${length / 3}px`,
                    width:`${length / 3}px`, height:`${tableHeight}px`, color:'white', textAlign:'center'}}>
                    {
                        <div>
                            <div>
                                Press Space Bar to play a turn
                            </div>
                            <div>
                                Total number of turns: {this.state.turnCounter}
                            </div>
                            {
                                this.state.p1score === 0 || this.state.p2score === 0 ?
                                    <div>
                                        Game Over <br />
                                        {this.state.p2score === 0
                                            ? 'Player 1 wins' : 'The Computer Won'}
                                        <br /> Press F5 to restart
                                    </div>
                                    : <div></div>
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}
