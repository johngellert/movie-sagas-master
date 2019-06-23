import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
// takeEvery Allows an saga to run only when a matching patter is dispatched, and runs that saga function
// put allows the saga to dispatch an action to the Store.
import { takeEvery, put } from 'redux-saga/effects';
// Axios allows client to send asynchronous CRUD operation request to server
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies);
    yield takeEvery('FETCH_CURRENT_MOVIE_GENRES', fetchCurrentMoviesGenres);
}

// Declare fetchMovies generator function
// Send 'GET' request to server at url: '/'
// Put dispatches action to store to set redux state
function* fetchMovies() {
    try {
        // movieResponse is an object with an array of objects with properties of id, title, poster, description
        const moviesResponse = yield axios.get('/API/movies');
        // moviesResponse.data is only the array of objects with properties of id, title, poster, description
        yield put({ type: 'SET_MOVIES', payload: moviesResponse.data });
    } catch (error) {
        // catch error if issues with axios.get or put
        console.log('error fetching movies', error);
    }
}

function* fetchCurrentMoviesGenres(action) {
    try {
        console.log('fetch current genre saga');
        // movieGenresResponse is an object with an array of objects with properties of movieId, title, genreName
        // Sending data to server in an object with property of currentMovieId with the action.payload, which is a number id of the current movie
        const currentMovieGenresResponse = yield axios.post('/API/movies/current/genres', action);
        // movieGenresResponse.data is an array of objects with properties of movieId, title, genreName
        yield put({ type: 'SET_CURRENT_MOVIE_GENRES', payload: currentMovieGenresResponse.data });
    } catch (error) {
        console.log('error fetching current movie genres', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

//Used to store current movie id
const movieId = (state = 0, action) => {
    switch (action.type) {
        case 'SET_CURRENT_MOVIE_ID':
            return action.payload;
        default:
            return state;
    }
}

//Used to store current movie genres
const currentMovieGenre = (state = [], action) => {
    switch (action.type) {
        case 'SET_CURRENT_MOVIE_GENRES':
            return action.payload;
        default:
            return state;
    }
}



// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieId,
        currentMovieGenre
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
