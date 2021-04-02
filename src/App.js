import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';

import Main from './js/regions/main.js';
import './scss/all.scss';

class App extends Component {
  constructor() {
    super();

    this.history = createHistory();
  }

  render() {
    return (
        <Router history={this.history}>
            <Main />
        </Router>
    );
  }
}

export default App;
