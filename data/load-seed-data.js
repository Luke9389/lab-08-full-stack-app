require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
const types = require('./types');
const games = require('./games');
const client = new Client(process.env.DATABASE_URL);


client.connect()
    .then(() => {
        return Promise.all(
            types.map(type => {
                return client.query(`
                    INSERT INTO types (name)
                    VALUES ($1)
                    RETURNING *;
                `,
                [type])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(types => {
        return Promise.all(
            games.map(game => {
                const type = types.find(type => {
                    return type.name === game.type;
                });
                const typeId = type.id;

                return client.query(`
                    INSERT INTO games (name, type_id, url, year, description, is_multiplayer)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
                [game.name, typeId, game.url, game.year, game.desc, game.isMultiplayer]
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