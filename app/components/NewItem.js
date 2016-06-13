'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  DeviceEventEmitter,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const imageIcon = (<Icon name="image" size={20} color="black" />)
const mapIcon = (<Icon name="map-pin" size={20} color="black" />)

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
    let bodyPlaceHolder = `请输入问题描述:
    
        您可以添加最多6张图片,如果这是一个针对某特定区域的问题,请添加地理位置信息`;
    return (
      <View style={styles.container}>
         <View style={[styles.inputContainer]}>
           <TextInput
             autoFocus={true}
             autoCapitalize="sentences"
             placeholder="请输入问题标题..."
             style={[styles.text,styles.title,{height:40}]}
             onEndEditing={(text) => {this.refs.body.focus()}}
           />
         </View>
         <View style={[styles.inputContainer]}>
            <TextInput
             ref="body"
             multiline={true}
             placeholder={bodyPlaceHolder}
             style={[styles.text,{height:bodyHeight}]}
             textAlignVertical="top"
            />
            <View style={styles.bench}>
              <TouchableOpacity
                onPress={() => {console.log('imageIcon pressed');}}
              >
                {imageIcon}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {console.log('mapIcon pressed');}}
              >
                {mapIcon}
              </TouchableOpacity>
            </View>
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
  },
  bench: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default NewItem
