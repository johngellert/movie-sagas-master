// import React to use components and JSX
// import Component to create class components
import React, { Component } from 'react';
// import connect so that component can access the redux state
import { connect } from 'react-redux';

class EditView extends Component {

    state = {
        newTitle: '',
        newDescription: '',
    }

    handleClickCancel = () => {
        // this.props.history.push('/details');
    }

    handleClickSubmit = () => {
        // this.props.history.push('/details');
        console.log(this.state.newTitle);
        console.log(this.state.newDescription);
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
                <button onClick={this.handleClickSubmit}>Save</button>
                <label>Title</label>
                <input value={this.state.newTitle} onChange={this.handleChangeTitle}></input>

                <label>Description</label>
                <input value={this.state.newDescription} onChange={this.handleChangeDescription}></input>
                <pre>
                    {JSON.stringify(this.props.reduxState, null, 4)}
                </pre>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState: reduxState,
});

export default connect(mapReduxStateToProps)(EditView);