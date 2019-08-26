import Component from '../Component.js';
import { addGame } from '../../services/games-api.js';

class GameForm extends Component {

    onRender(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const game = {
                name: formData.get('name'),
                typeId: +formData.get('type-id'),
                url: formData.get('url'),
                year: +formData.get('year'),
                desc: formData.get('desc'),
                isMultiplayer: formData.get('is-multiplayer') === 'on'
            };

            addGame(game)
                .then((/*saved*/) => {
                    window.location = `game-list.html`;
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
                    <input id="desc" required>
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