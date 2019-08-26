import Component from '../Component.js';
import Header from './Header.js';
import QUERY from '../../services/QUERY.js';
import { getGame } from '../../services/games-api.js';
import GameItem from '../games/GameItem.js';



class GameDetailApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');


        const params = QUERY.parse(window.location.search);
        const id = params.id;
        console.log(id);

        if(!id) {
            window.location = 'games-list.html';
            return;
        }

        getGame(id)
            .then(game => {
                console.log(game);
                const detailPage = new GameItem({ game });
                main.appendChild(detailPage.renderDOM());
            });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    
                </main>
            </div>
        `;
    }
}

export default GameDetailApp;