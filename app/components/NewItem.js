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
  TouchableOpacity,
  Image
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
      visibleHeight: 0,
      images: []
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

  selectImage = () => {
    console.log('imageIcon pressed');
    var ImagePicker = require('react-native-image-picker');

    var options = {
      title: '选择图片', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: '',//'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      // customButtons: {
      //   'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
      // },
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      maxWidth: 100, // photos only
      maxHeight: 100, // photos only
      aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.2, // 0 to 1, photos only
      angle: 0, // android only, photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image after selection
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // uri (on iOS)
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        //const source = {uri: response.uri, isStatic: true};
        //console.log('source ',source);

        this.setState({
          images: this.state.images.concat([source.uri])
        });
      }
    });
  }

  preview = () => {
    console.log('preview!');
  }

  render(){
    console.log('images ',this.state.images);

    //console.log('width', Dimensions.get('window').width);
    let imageSize = (Dimensions.get('window').width - 20)/6; //20 is margins for container

    let imageItems = this.state.images.length > 0 ? this.state.images.map((image) => {
      console.log('image ',image);
      return <Image key={image} style={{height:imageSize,width:imageSize}} source={{uri: image}}/>
    }) : null;

    console.log('imageItems',imageItems);

    let bodyHeight = this.state.images.length > 0 ? this.state.visibleHeight - 160 - imageSize : this.state.visibleHeight - 160;
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
            <View style={styles.imageContainer}>
              {imageItems}
            </View>
            <View style={styles.bench}>
              <TouchableOpacity
                onPress={this.selectImage}
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
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center'
  }
})

export default NewItem
