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
                            {this.props.movies[6].title}
                        </div>
                        <div className="movie-description">
                            {this.props.movies[6].description}
                        </div>
                    </>
                    :
                    <></>
                }



                {/* this.props.reduxState.movies.title */}
                {/* <>
                    <div className="movie-title">
                        {movieItem.title}
                    </div>
                    <div className="movie-poster">
                        <img src={movieItem.poster} alt={`Image of the movie ${movieItem.title}`} />
                    </div>
                    <div className="movie-poster">
                        {movieItem.description}
                    </div>
                </>
                })} */}
                {/* display title */}
                {/* display description */}
                {/* display genres associated with movie*/}


            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies
});

export default connect(mapReduxStateToProps)(DetailView);