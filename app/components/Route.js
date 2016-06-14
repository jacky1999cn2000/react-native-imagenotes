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

var reactMixin = require('react-mixin');
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

// let NavigationBarRouteMapper = {
//    LeftButton: function(route, navigator, index, navState) {
//      switch (route.name) {
//        case 'detail':
//          return (
//            <BackButton
//             onPress={() => navigator.pop()}
//             customText='Back'
//            />
//          );
//        case 'newItem':
//          return (
//            <BackButton
//             onPress={() => navigator.pop()}
//             customText='Back'
//            />
//          );
//        default:
//          return null;
//      }
//    },
//    RightButton: function(route, navigator, index, navState) {
//      switch (route.name) {
//        case 'newItem':
//          return (
//            <BackButton
//             onPress={() => {
//               console.log('preview!');
//               this.EventEmitter.emit("update_event", { message: "hello from up here"});
//             }}
//             customText='Preview'
//            />
//          );
//        default:
//          return null;
//     }
//    },
//    Title: function(route, navigator, index, navState) {
//
//    }
// }

class Route extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
    };
    // this.EventEmitter = new EventEmitter();

    this.NavigationBarRouteMapper = {
       EventEmitter : new EventEmitter(),
       LeftButton: function(route, navigator, index, navState) {
         switch (route.name) {
           case 'detail':
             return (
               <BackButton
                onPress={() => navigator.pop()}
                customText='Back'
               />
             );
           case 'newItem':
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
         switch (route.name) {
           case 'newItem':
             return (
               <BackButton
                onPress={() => {
                  console.log('RightButton preview!');
                  console.log('this.EventEmitter',this.EventEmitter);
                  this.EventEmitter.emit('preview');
                }}
                customText='Preview'
               />
             );
           default:
             return null;
        }
       },
       Title: function(route, navigator, index, navState) {

       }
    };

  }

  renderScene = (route, navigator) => {
    let Component = ROUTE[route.name];
    if(route.name == 'newItem'){
      return <Component route={route} navigator={navigator} events={this.NavigationBarRouteMapper.EventEmitter}/>;
    }
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
            routeMapper={this.NavigationBarRouteMapper}
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
