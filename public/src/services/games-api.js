
const URL = '/api';

export function getGames() {

    const url = `${URL}/games`;

    return fetch(url)
        .then(response => response.json());
}