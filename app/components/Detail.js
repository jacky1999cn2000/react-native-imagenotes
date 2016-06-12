'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux'

class Detail extends React.Component {
  constructor(){
    super(...arguments);

  }

  render(){
    let title = this.props.route.data.get('title');
    let content = this.props.route.data.get('text');
    let id = this.props.route.data.get('id');
    return (
      <View style={styles.container}>
        <View style={styles.question}>
          <Text>
            id: {id}
          </Text>
          <Text>
            title: {title}
          </Text>
          <Text>
            content: {content}
          </Text>
        </View>
        <View style={styles.answers}>
          <Text>
            here
          </Text>
        </View>

      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  question:{
    flex: 1,
    backgroundColor: 'red',
    height: 200,
  },
  answers:{
    flex: 2,
    backgroundColor: 'blue'
  }
})

Detail = connect()(Detail)

export default Detail
