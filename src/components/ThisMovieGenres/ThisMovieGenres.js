// import React to use components and JSX
// import Component to create class components
import React, { Component } from 'react';
// import connect so that component can access the redux state
import { connect } from 'react-redux';

class ThisMovieGenres extends Component {

    render() {

        return (
            <>
                <div className="movie-genres-title">Genres</div>
                <div className="genre-container">
                    {this.props.currentMovieGenre.length !== 0 ?
                        <ul>
                            {this.props.currentMovieGenre.map((genreItem) => {
                                return <li key={genreItem.genreID}>{genreItem.genreName}</li>
                            })}
                        </ul>
                        :
                        <></>
                    }
                </div>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    currentMovieGenre: reduxState.currentMovieGenre,
});

export default connect(mapReduxStateToProps)(ThisMovieGenres);