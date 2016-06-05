'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import imagenotesReducers from './reducers'
import App from './containers/App'

let store = applyMiddleware(thunk)(createStore)(imagenotesReducers)

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
