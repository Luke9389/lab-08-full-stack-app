import Component from '../Component.js';


class Nav extends Component {
    renderHTML(){
        return /*html*/`
            <nav>
                <a href="./">Home</a>
                <a href="./game-list.html">Games</a>
                <a href="./game-form.html">Add a Game</a>
            </nav>
        `;
    }
}

export default Nav;