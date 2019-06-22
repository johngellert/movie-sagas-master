// import React to use components and JSX
// import Component to create class components
import React, { Component } from 'react';
// import connect so that component can access the redux state
import { connect } from 'react-redux';

class DetailView extends Component {

    handleClickBackToMovies = () => {
        this.props.history.push('/');
    }

    render() {

        return (
            <>
                <button onClick={this.handleClickBackToMovies}>Back To Movies</button>

                {this.props.movies.length !== 0 ?
                    <>
                        <div className="movie-title">
                            {this.props.movies[parseInt(this.props.movieId) - 1].title}
                        </div>
                        <div className="movie-description">
                            {this.props.movies[parseInt(this.props.movieId) - 1].description}
                        </div>
                    </>
                    :
                    <></>
                }

                {/* display genres associated with movie*/}


            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies,
    movieId: reduxState.movieId,
});

export default connect(mapReduxStateToProps)(DetailView);