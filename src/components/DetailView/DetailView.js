// import React to use components and JSX
// import Component to create class components
import React, { Component } from 'react';
// import connect so that component can access the redux state
import { connect } from 'react-redux';

class DetailView extends Component {

    handleClickBackToMovies = () => {
        this.props.history.push('/');
    }

    handleClickEdit = () => {
        this.props.history.push('/edit');
    }

    render() {

        return (
            <>
                <button onClick={this.handleClickBackToMovies}>Back To Movies</button>
                <button onClick={this.handleClickEdit}>Edit</button>

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
                <br />
                <div className="movie-genres-title">Genre</div>
                <div className="genre-container">
                    {this.props.currentMovieGenre.length !== 0 ?
                        <ul>
                            {this.props.currentMovieGenre.map((genreItem) => {
                                return <li>{genreItem.genreName}</li>
                            })}
                        </ul> 
                        :
                        <p>Click "Edit" to add a genre!</p>
                    }

                </div>
                {/* <Route path="/edit" exact component={EditView} /> */}
                <pre>
                    {JSON.stringify(this.props.reduxState.currentMovieGenre, null, 4)}
                </pre>

            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies,
    movieId: reduxState.movieId,
    currentMovieGenre: reduxState.currentMovieGenre,
    reduxState: reduxState,
});

export default connect(mapReduxStateToProps)(DetailView);