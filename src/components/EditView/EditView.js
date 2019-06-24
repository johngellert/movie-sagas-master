// import React to use components and JSX
// import Component to create class components
import React, { Component } from 'react';
// import connect so that component can access the redux state
import { connect } from 'react-redux';

import ThisMovieGenres from '../ThisMovieGenres/ThisMovieGenres.js';

class EditView extends Component {

    state = {
        newTitle: '',
        newDescription: '',
    }

    handleClickCancel = () => {
        this.props.history.push('/details');
        this.resetLocalState();
    }

    handleClickSave = () => {
        this.props.history.push('/details');
        this.props.dispatch({type: 'UPDATE_MOVIE', payload: {...this.state, id: this.props.movieId}});

        this.resetLocalState();
    }

    handleChangeTitle = (event) => {
        this.setState({
            ...this.state,
            newTitle: event.target.value,
        });
    }

    handleChangeDescription = (event) => {
        this.setState({
            ...this.state,
            newDescription: event.target.value,
        });
    }

    resetLocalState = () => {
        this.setState({
            newTitle: '',
            newDescription: '',
        });
    }

    render() {

        return (
            <div>
                <button onClick={this.handleClickCancel}>Cancel</button>
                <button onClick={this.handleClickSave}>Save</button>
                <label>Title</label>
                <input value={this.state.newTitle} onChange={this.handleChangeTitle}></input>

                <label>Description</label>
                <input value={this.state.newDescription} onChange={this.handleChangeDescription}></input>
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
                <ThisMovieGenres />
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies,
    movieId: reduxState.movieId,
    reduxState: reduxState,
});

export default connect(mapReduxStateToProps)(EditView);