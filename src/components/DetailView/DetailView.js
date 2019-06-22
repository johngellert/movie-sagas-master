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
            
            
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState: reduxState
});

export default connect(mapReduxStateToProps)(DetailView);