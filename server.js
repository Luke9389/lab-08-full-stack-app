// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

// Database Client
const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public'));
app.use(express.json());

app.get('/api/games', (req, res) => {
    client.query(`
        SELECT
            g.id,
            g.name,
            g.type_id,
            t.name as type,
            g.url,
            g.year,
            g.description,
            g.is_multiplayer "isMultiplayer"
        FROM games g
        JOIN types t
        ON  g.type_id = t.id
        ORDER BY g.year;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.get('/api/games/:id', (req, res) => {
    const id = req.params.id;
    client.query(`
        SELECT
              g.*,
              t.name as type
        FROM  games g
        JOIN  types t
        ON    g.type_id = t.id
        WHERE g.id = $1
    `,
    [id]
    )
        .then(result => {
            const game = result.rows[0];
            if(!game) {
                res.status(404).json({
                    error: `Game id ${id} does not exist`
                });
            }
            else {
                res.json(result.rows[0]);
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/games', (req, res) => {
    const game = req.body;
    console.log(game);
    client.query(`
        INSERT INTO games (name, type_id, url, year, description, is_multiplayer)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `,
    [game.name, game.typeId, game.url, game.year, game.desc, game.isMultiplayer]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.get('/api/types', (req, res) => {
    client.query(`
        SELECT
            id,
            name
        FROM types
        ORDER BY name;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});