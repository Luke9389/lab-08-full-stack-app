import Component from '../Component.js';
import Header from './Header.js';
import Nav from './Nav.js';
import GameList from '../games/GameList.js';
import { getGames } from '../../services/games-api.js';


class GameListApp extends Component {

    onRender(dom) {
        const nav = new Nav();
        dom.prepend(nav.renderDOM());

        const header = new Header({ title: 'Game Recommendations' });
        dom.prepend(header.renderDOM());

        const list = new GameList({ games: [] });
        const main = dom.querySelector('main');
        main.appendChild(list.renderDOM());

        getGames().then(games => {
            console.log('gamelist thinks:', games);
            list.update({ games });
        });
    }

    renderHTML() {
        return /*html*/`
            <div id="layout-wrapper">
                <!-- header goes here -->
                <!-- nav goes here -->
                <main></main>
            </div>
        `;
    }

}

export default GameListApp;