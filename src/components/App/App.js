import React, { Component } from 'react';
import './App.css';
// HashRouter allows client side routing
import { HashRouter as Router, Route, Link } from 'react-router-dom';

// import connect so that component can access the redux state
import { connect } from 'react-redux';

// Import MovieList.js component
import MovieList from '../MovieList/MovieList';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <div className="App">
          <p>Empty Page</p>
        </div>
        <MovieList />

        <pre>
          {JSON.stringify(this.props.reduxState, null, 4)}
        </pre>
      </Router>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
  reduxState: reduxState,
})

export default connect(mapReduxStateToProps)(App);
