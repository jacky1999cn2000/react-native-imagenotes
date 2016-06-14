'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
const backIcon = (<Icon name="ios-arrow-back" size={10} color="black" />)

class BackButton extends React.Component {
  constructor(){
    super(...arguments);
  }

  render(){
    return (
      <TouchableOpacity
        onPress={this.props.onPress}>
        <View>
          <Text>
            {backIcon}{this.props.customText}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default BackButton
