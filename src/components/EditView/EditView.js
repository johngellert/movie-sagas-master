// import React to use components and JSX
// import Component to create class components
import React, { Component } from 'react';
// import connect so that component can access the redux state
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class EditView extends Component {

    handleClickCancel = () => {
        this.props.history.push('/details');
    }

    handleClickSubmit = () => {
        this.props.history.push('/details');
    }

    render() {

        return (
            <div>
                <Link to={'/details'}><button onClick={this.handleClickCancel}>Cancel</button></Link>
                
                <button onClick={this.handleClickSubmit}>Save</button>

                <pre>
                    {JSON.stringify(this.props.reduxState.currentMovieId, null, 4)}
                </pre>

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState: reduxState,
});

export default connect(mapReduxStateToProps)(EditView);