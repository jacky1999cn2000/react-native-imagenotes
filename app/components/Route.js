'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import ROUTE from '../config/route'
import BackButton from './BackButton'

let NavigationBarRouteMapper = {
   LeftButton: function(route, navigator, index, navState) {
     switch (route.name) {
       case 'detail':
         return (
           <BackButton
            onPress={() => navigator.pop()}
            customText='Back'
           />
         );
       default:
         return null;
     }
   },
   RightButton: function(route, navigator, index, navState) {

   },
   Title: function(route, navigator, index, navState) {

   }
}

class Route extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
    };
  }

  renderScene = (route, navigator) => {
    let Component = ROUTE[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
          />
        }
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
      />
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Route
