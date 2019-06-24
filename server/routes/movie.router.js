const express = require('express');
const router = express.Router();

// Import pool module to connect to the database
const pool = require('../modules/pool'); 

router.get('/', (req, res) => {
    // Declare movieSelectQuery constant set to SQL query.
    const movieSelectQuery = 'SELECT * FROM "movies" ORDER BY "id";';

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
});
//[req.body.data.currentMovieId]
router.post('/current/genres', (req, res) => {
    const currentMovieGenreQuery =  `
    SELECT  
    "genres"."name" as "genreName", 
    "genres"."id" as "genreID" 
    FROM "movies"
    LEFT OUTER JOIN "movies_genres" ON "movies_genres"."movie_id"="movies"."id"
    LEFT OUTER JOIN "genres" ON "genres"."id"="movies_genres"."genre_id"
    WHERE "movies_genres"."movie_id" = $1`;
    pool.query(currentMovieGenreQuery, [req.body.payload]).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        console.log('Error completing SELECT current movie genres', error);
        // Send status code 500 (Internal Server Error) to the promise created in the fetchCurrentMoviesGenres saga.
        res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
    const updateMovieQuery = `UPDATE "movies" SET "title"= $1, "description" = $2
    WHERE "id"=$3;`;
    pool.query(updateMovieQuery, [req.body.newTitle, req.body.newDescription, req.body.id]).then((result) => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error completing UPDATE current movie', error);
        // Send status code 500 (Internal Server Error) to the promise created in the updateCurrentMoviesGenres saga.
        res.sendStatus(500);
    });
});

module.exports = router;