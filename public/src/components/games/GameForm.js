import Component from '../Component.js';
import { addGame } from '../../services/games-api.js';

class GameForm extends Component {

    onRender(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formDaddy = new FormData(form);

            const game = {
                name: formDaddy.get('name'),
                typeId: +formDaddy.get('type-id'),
                url: formDaddy.get('url'),
                year: +formDaddy.get('year'),
                desc: formDaddy.get('desc'),
                isMultiplayer: formDaddy.get('is-multiplayer') === 'on'
            };

            addGame(game)
                .then((res) => {
                    console.log(res);
                    // window.location = `game-list.html`;
                })
                .catch(err => {
                    console.log('game not saved. fool.', err);
                });
        });

    }

    renderHTML() {
        const types = this.props.types;
        const optionsList = types.map(type => {
            return /*html*/`
                <option value="${type.id}">${type.name}</option>
            `;
        });

        return /*html*/ `
            <form class="game-form">
                <section>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Name of the Game">
                </section>

                <section>
                    <label for="type">Genre</label>
                    <select id="type" name="type-id" required>
                        <option disabled selected>Select a genre</option>
                        ${optionsList.join('')}
                    </select>
                </section>

                <section>
                     <label for="url">Splash Image Url</label>
                     <input id="url" name="url" required>
                </section>

                <section>
                    <label for="year">Year Published</label>
                    <input id="year"
                        name="year"
                        required
                        pattern="^[0-9]{4}$"
                        placeholder="2019"
                        title="Four digit year">
                </section>

                <section>
                    <label for="desc">Description</label>
                    <input id="desc" name="desc" required>
                </section>

                <fieldset for="is-mulitplayer">
                    <legend>Is it Multiplayer?</legend>
                    <label>
                        <input id="is-multiplayer" name="is-multiplayer" type="checkbox">Yuh
                    </label>
                </fieldset>

                <section>
                    <button>Archive this Game</button>
                </section>
            </form>
        `;
    }

}

export default GameForm;