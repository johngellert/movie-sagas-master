import React, { Component } from 'react';
import './App.css';
// HashRouter allows client side routing
import { HashRouter as Router, Route } from 'react-router-dom';

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
        </div>
      </Router>
    );
  }
}

export default connect()(App);
