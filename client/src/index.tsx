import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { War } from './Games/War';

const production = true;

class Game {
    title: string = '';
    url: string = '';
    reactcomponent: any = undefined;
    constructor(title: string, url: string, reactcomponent: any) {
        this.title = title;
        this.url = url;
        this.reactcomponent = reactcomponent;
    }
}

const games = [
    new Game('War', '/War', War)
]

class Index extends React.Component {
    render() {
        return (
            <div>
                <br />
                {
                    games.map(game =>
                        <div key="game.title">
                            <Link to={game.url}>{game.title}</Link>
                            <br />
                        </div>
                    )
                }
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Router basename={production ? '/card-games/' : '/'}>
                <Route path="/" exact component={Index} />
                {
                    games.map(game =>
                        <Route key={game.url} path={game.url} exact component={game.reactcomponent} />
                    )
                }
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
