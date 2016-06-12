'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class NewItem extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      selectedTab: 'feed'
    };
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>
        new item
        </Text>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default NewItem
