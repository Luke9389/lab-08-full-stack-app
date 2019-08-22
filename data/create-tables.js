require('dotenv').config();

const pg = require('pg');

const Client = pg.Client;

const client = new Client(process.env.DATABASE_URL);

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE games (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL,
                type VARCHAR(256) NOT NULL,
                url VARCHAR(256) NOT NULL,
                year INTEGER NOT NULL,
                description TEXT NOT NULL,
                is_multiplayer BOOLEAN NOT NULL
            );
    `);
    })
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });