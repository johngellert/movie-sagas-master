import React, { Component } from 'react';
import './App.css';
// HashRouter allows client side routing
import { HashRouter as Router, Route, Link } from 'react-router-dom';

// import connect so that component can access the redux state
import { connect } from 'react-redux';

// Import components
import MovieList from '../MovieList/MovieList';
import DetailView from '../DetailView/DetailView';
import EditView from '../EditView/EditView.js';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={MovieList} />
          <Route path="/details" exact component={DetailView} />
          <Route path="/edit" exact component={EditView} />

          {/* <pre>
          {JSON.stringify(this.props.reduxState, null, 4)}
        </pre> */}
        </div>
      </Router>
    );
  }
}

// Map redux state to props so component can access the redux state
const mapReduxStateToProps = (reduxState) => ({
  reduxState: reduxState,
})

export default connect(mapReduxStateToProps)(App);
