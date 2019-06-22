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
}

// Declare fetchMovies generator function
// Send 'GET' request to server at url: '/'
// Put dispatches action to store to set redux state
function* fetchMovies() {
    try {
         // movieResponse is an object with an array of objects with properties of id, title, poster, description
        const moviesResponse = yield axios.get('/API');
        // moviesResponse.data is only the array of objects with properties of id, title, poster, description
        yield put({type: 'SET_MOVIES', payload: moviesResponse.data });
    } catch(error) {
        // catch error if issues with axios.get or put
        console.log('error fetching movies', error)
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

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
