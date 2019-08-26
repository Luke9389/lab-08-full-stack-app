import Component from '../Component.js';
import GameItem from './GameItem.js';

class GameList extends Component {

    onRender(dom){
        const list = this.props.games;

        list.forEach(game => {
            const props = { game: game };
            const gameItem = new GameItem(props);
            const gameItemDOM = gameItem.renderDOM();
            dom.appendChild(gameItemDOM);
        });

    }

    renderHTML(){

        return /*html*/`
            <div class="game-list"></div>
        `;

    }

}

export default GameList;