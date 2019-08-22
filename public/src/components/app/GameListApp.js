import Component from '../Component.js';
import Header from './Header.js';
import Nav from './Nav.js';
import GameList from '../games/GameList.js';
import { games } from '../../services/games.js';


class GameListApp extends Component {

    onRender(dom) {
        const nav = new Nav();
        dom.prepend(nav.renderDOM());

        const header = new Header({ title: 'Game Recommendations' });
        dom.prepend(header.renderDOM());

        console.log('GameList.js thinks list is:', games);
        const list = new GameList({ list: games });
        const main = dom.querySelector('main');
        main.appendChild(list.renderDOM());

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