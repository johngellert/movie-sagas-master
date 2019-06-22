import React, { Component } from 'react';
import './App.css';
// HashRouter allows client side routing
import { HashRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <div className="App">
          <p>Empty Page</p>
        </div>
      </Router>
    );
  }
}

export default App;
