'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux'


class App extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
    };
  }

  componentDidMount(){
    //this.props.dispatch(getTodos());
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>
          hello
        </Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  }
})

App = connect(
  state => {
    console.log('state',state);
   return {};
 },
 dispatch => {
   return { dispatch }
 }
)(App)

export default App
