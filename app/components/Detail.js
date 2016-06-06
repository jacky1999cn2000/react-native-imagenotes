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
    return (
      <View style={styles.container}>
        <Text>
          detail
        </Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

Detail = connect()(Detail)

export default Detail
