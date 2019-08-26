import Component from '../Component.js';

class GameDetailPage extends Component {
    renderHTML() {
        const game = this.props;

        return /*html*/`
            <div class="game-rec-wrapper">
                <div class="game-img-wrapper">
                    <img class="game-img" src="${game.url}" alt="${game.name} image">
                </div>
                <div class="game-info-section">
                    <h2>${game.name}</h2>
                    <p class="game-type">${game.type}</p>
                    <p class="game-desc">${game.description}</p>
                </div>
            </div>
        `;
    }
}

export default GameDetailPage;