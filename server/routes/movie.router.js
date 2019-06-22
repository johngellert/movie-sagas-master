const express = require('express');
const router = express.Router();

// Import pool module to connect to the database
const pool = require('../modules/pool'); 

router.get('/', (req, res) => {
    // Declare movieSelectQuery constant set to SQL query.
    const movieSelectQuery = 'SELECT * FROM "movies";';

    // Query the database by passing the movieSelectQuery into the query function.
    // Result is an object sent back from the database with a property of rows, which 
    // contains an array of objects with properties of, id, title, poster, description.
    pool.query(movieSelectQuery).then(result => {
        // result.rows is the array of objects with properties of, id, title, poster, description.
        // Send result.rows to the promise created in the fetchMovies saga.
        res.send(result.rows);
    }).catch(error => {
        // Log error if SELECT fails
        console.log('Error completing SELECT movies query', error);
        // Send status code 500 (Internal Server Error) to the promise created in the fetchMovies saga.
        res.sendStatus(500);
    });
})

module.exports = router;