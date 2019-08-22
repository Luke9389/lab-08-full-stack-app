require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
const games = require('./games');
const client = new Client(process.env.DATABASE_URL);


client.connect()
    .then(() => {
        return Promise.all(
            games.map(game=> {
                return client.query(`
                    INSERT INTO games (name, type, url, year, desc, is_multiplayer)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
                [game.name, game.type, game.url, game.year, game.desc, game.is_multiplayer]
                );
            })
        );
    })
    .then(
        () => console.log('seed data upload complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });