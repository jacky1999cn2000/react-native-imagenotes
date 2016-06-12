'use strict';

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions,
  AsyncStorage,
  ActivityIndicatorIOS
} from 'react-native';

import {fromJS, is, Map} from 'immutable';

const windowSize = Dimensions.get('window');

class Signin extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      username: '',
      password: '',
      isLoading: false
    }
  }
  async componentWillMount(){
    console.log('componentWillMount');
    //use 'imagenotes' to skip login
    let userInfo = await AsyncStorage.getItem('imagenotes');
    console.log('userInfo', userInfo);
    if(userInfo){
      this.props.navigator.resetTo({name:'app'});
    }
    //  AsyncStorage.getItem('imagenotes').then((value) => {
    //     console.log('value',value);
    //     if(value){
    //       console.log('here');
    //       this.props.navigator.resetTo({name:'app'});
    //     }
    // }).done();
  }

  render(){
    console.log('render');

    var spinner = this.state.isLoading ?
            ( <ActivityIndicatorIOS
                hidden='true'
                size='large'/> ) :
            ( <View/>);

    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                    <TextInput
                        onChangeText={(username) => this.setState({username})}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Username"
                        placeholderTextColor="#FFF"
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                    <TextInput
                        onChangeText={(password) => this.setState({password})}
                        password={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Pasword"
                        placeholderTextColor="#FFF"
                        value={this.state.password}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
            </View>
            <View style={styles.spinner}>
              {spinner}
            </View>
            <TouchableHighlight
                underlayColor="white"
                onPress={() => {
                  console.log('signin start');
                  this.setState({isLoading: true});
                  setTimeout(() => {
                    let userInfo = JSON.stringify({
                      name: 'jacky',
                      role: 'superuser'
                    });
                    AsyncStorage.setItem('imagenotes', userInfo);
                    this.props.navigator.resetTo({name:'app'});
                    console.log('signin done');
                  }, 3000);
                  console.log('signin in progress');
                }}
            >
                <View style={styles.signin}>
                  <Text style={styles.whiteFont}>Sign In</Text>
                </View>
            </TouchableHighlight>

            <View style={styles.signup}>
                <Text style={styles.greyFont}>Don't have an account?</Text>
                <TouchableHighlight
                    underlayColor="grey"
                    onPress={() => {console.log('pressed');}}
                >
                <Text style={styles.whiteFont}>  Sign Up</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    },
    spinner: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 36,
      marginBottom: 10
    }
})

export default Signin
