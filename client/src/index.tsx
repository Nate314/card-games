import {
    BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { War } from './Games/War';

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
            <Router basename={import.meta.env.BASE_URL}>
                <Routes>
                    <Route path="/" element={<Index />} />
                    {
                        games.map(game =>
                            <Route key={game.url} path={game.url} element={<game.reactcomponent />} />
                        )
                    }
                </Routes>
            </Router>
        );
    }
}

createRoot(document.getElementById('root')!).render(<App/>);
