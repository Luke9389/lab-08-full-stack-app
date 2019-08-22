
const URL = '/api';

export function getGames() {

    const url = `${URL}/games`;
    console.log(url);

    return fetch(url)
        .then(response => response.json());
}