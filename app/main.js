'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import imagenotesReducers from './reducers'
import Route from './components/Route'

let store = applyMiddleware(thunk)(createStore)(imagenotesReducers)

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}
