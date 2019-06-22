// import React to use components and JSX
// import Component to create class components
import React, { Component } from 'react'; 
// import connect so that component can dispatch actions to reducer
import { connect } from 'react-redux';


class MovieList extends Component {

    // use component did mount to trigger dispatch on page load
    componentDidMount() {
        gitImageList(); // call gitImageList when the components loads
    }

    // declare getImage method to dispatch an action object with type property of 'FETCH_MOVIES'
    getImageList = () => {
        this.props.dispatch({type: 'FETCH_MOVIES'}) // dispatch to sagas
    }

    render() {
        return (
            <></>
        );
    }
}

export default connect()(MovieList);