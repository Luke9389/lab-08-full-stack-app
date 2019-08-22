import Component from '../Component.js';
import Header from './Header.js';
import Nav from './Nav.js';

class App extends Component {

    onRender(dom) {
        const nav = new Nav();
        dom.prepend(nav.renderDOM());

        const header = new Header();
        dom.prepend(header.renderDOM());
    }

    renderHTML(){
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- nav goes here -->
                <main>
                    <p>Main App Page</p>
                </main>
            </div>
        `;
    }

}

export default App;