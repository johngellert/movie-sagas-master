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

    render() {
        return (
            <div className="movie-container">

                {this.props.movies.map(movieItem => {
                    return (
                        <>
                            <div className="movie-title">
                                {movieItem.title}
                            </div>
                            <div className="movie-poster">
                                <img src={movieItem.poster} alt={`Image of the movie ${movieItem.title}`} />
                            </div>
                            <div className="movie-poster">
                                {movieItem.description}
                            </div>
                        </>);
                })}
                <pre>
                    {JSON.stringify(this.props.movies, null, 4)}
                </pre>
            </div>
        );
    }
}

// Map redux state to props so component can access the redux state
const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies,
})


export default connect(mapReduxStateToProps)(MovieList);