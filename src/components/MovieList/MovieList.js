// import React to use components and JSX
// import Component to create class components
import React, { Component } from 'react';
// import connect so that component can access the redux state
import { connect } from 'react-redux';


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
        console.log(event.target.value);
        // Route to the DetailView component
        this.props.history.push('/details');
        // dispatch to reduxState the id of the current movie
        this.props.dispatch({ type: 'SET_CURRENT_MOVIE_ID', payload: event.target.value });
        // dispatch to sagas with the id of the current movie
        this.props.dispatch({ type: 'FETCH_CURRENT_MOVIE_GENRES', payload: event.target.value });
    }

    render() {
        return (
            <div className="movie-container">
                {/* map through image reduxState and display title, poster, and description */}
                {this.props.movies.map(movieItem => {
                    return (
                        <>
                            <div className="movie-title">
                                {movieItem.title}
                            </div>
                            <div className="movie-poster-container">
                                <img
                                    className="movie-poster-image"
                                    src={movieItem.poster}
                                    alt={`The movie ${movieItem.title}`}
                                />
                            </div>
                            <div className="movie-description">
                                {movieItem.description}
                            </div>
                            <button
                                onClick={this.handClickPoster}
                                value={movieItem.id}
                            >View Details
                            </button>
                        </>);
                })}
                {/* <pre>
                    {JSON.stringify(this.props.reduxState.currentMovieGenre, null, 4)}
                </pre> */}

            </div>
        );
    }
}

// Map redux state to props so component can access the redux state
const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies,
    movieId: reduxState.movieId,
    reduxState: reduxState,
})


export default connect(mapReduxStateToProps)(MovieList);