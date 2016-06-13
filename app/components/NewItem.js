'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  DeviceEventEmitter,
  LayoutAnimation
} from 'react-native';

class NewItem extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      title: '',
      content: '',
      visibleHeight: 0
    };
  }

  componentWillMount () {
    this.keyboardDidShowListener = DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    let visibleHeight = Dimensions.get('window').height - e.endCoordinates.height
    console.log('keyboardDidShow');
    console.log('visibleHeight ',visibleHeight);
    this.setState({visibleHeight:visibleHeight})
  }

  keyboardDidHide = (e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    console.log('keyboardDidHide');
    console.log('visibleHeight ',Dimensions.get('window').height);
    this.setState({
      visibleHeight: Dimensions.get('window').height
    })
  }

  render(){
    let bodyHeight = this.state.visibleHeight - 160;
    console.log('bodyHeight ',bodyHeight);
    return (
      <View style={styles.container}>
         <View style={[styles.inputContainer]}>
           <TextInput
             autoFocus={true}
             autoCapitalize="sentences"
             placeholder="Untitled"
             style={[styles.text,styles.title,{height:40}]}
             onEndEditing={(text) => {this.refs.body.focus()}}
           />
         </View>
         <View style={[styles.inputContainer]}>
            <TextInput
             ref="body"
             multiline={true}
             placeholder="Start typing"
             style={[styles.text,{height:bodyHeight}]}
             textAlignVertical="top"
            />
        </View>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  container: {
     flex: 1,
     marginTop: 64,
     marginLeft: 10,
     marginRight: 10
  },
  inputContainer: {
     borderBottomColor: 'gray',
     borderBottomWidth: 1
  },
  text: {
     fontSize: 20,
  },
  title: {
    fontWeight: 'bold'
  }
})

export default NewItem
