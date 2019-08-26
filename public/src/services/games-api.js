
const URL = '/api';

export function getGames() {
    const url = `${URL}/games`;
    return fetch(url)
        .then(response => response.json());
}

export function getGame(id) {
    const url = `${URL}/games/${id}`;
    return fetch(url)
        .then(response => response.json());
}

export function addGame(game){ 
    const url = `${URL}/games`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game)
    })
        .then(response => response.json());
}

export function getTypes() {
    const url = `${URL}/types`;
    return fetch(url)
        .then(response => response.json());
}