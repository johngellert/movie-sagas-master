// import React to use components and JSX
// import Component to create class components
import React, { Component } from 'react';
// import connect so that component can access the redux state
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';


class MovieList extends Component {

    // use component did mount to trigger dispatch on page load
    componentDidMount() {
        this.getImageList(); // call getImageList when the components loads
    }

    // declare getImage method to dispatch an action object with type property of 'FETCH_MOVIES'
    getImageList = () => {
        this.props.dispatch({ type: 'FETCH_MOVIES' }) // dispatch to sagas
    }

    handClickPoster = (event) => {
        // Route to the DetailView component
        this.props.history.push('/details');
        // dispatch to reduxState the id of the current movie
        this.props.dispatch({ type: 'SET_CURRENT_MOVIE_ID', payload: event.target.value });
        // dispatch to sagas with the id of the current movie
        this.props.dispatch({ type: 'FETCH_CURRENT_MOVIE_GENRES', payload: event.target.value });
    }

    render() {
        return (
            <>
                {/* map through image reduxState and display title, poster, and description */}
                {this.props.movies.map(movieItem => {
                    return (
                        <Grid key={movieItem.id} container justify="center" spacing={16}>
                            <Grid item xs={6}>
                                <img
                                    src={movieItem.poster}
                                    alt={`The movie ${movieItem.title}`}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <h2>{movieItem.title}</h2>
                                {movieItem.description}
                                <br />
                                <button
                                    onClick={this.handClickPoster}
                                    value={movieItem.id}
                                >View Details
                                </button>
                            </Grid>
                        </Grid>
                    );
                })}
            </>
        );
    }
}

// Map redux state to props so component can access the redux state
const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies,
    movieId: reduxState.movieId,
})


export default connect(mapReduxStateToProps)(MovieList);