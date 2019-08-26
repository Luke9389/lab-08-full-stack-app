import Component from '../Component.js';
import Header from './Header.js';
import { getTypes } from '../../services/games-api.js';
import GameForm from '../games/GameForm.js';


class GameFormApp extends Component {
    onRender(dom) {
        const header = new Header({ title: 'Add a Game' });
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        getTypes()
            .then(types => {
                const gameForm = new GameForm({ types });
                main.appendChild(gameForm.renderDOM());
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

export default GameFormApp;