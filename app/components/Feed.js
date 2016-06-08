'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  RefreshControl,
  ListView,
  Modal,
  Picker
} from 'react-native';

import { connect } from 'react-redux'
import { getNotes, refreshNotes } from '../actions'
import {fromJS, is} from 'immutable'

import Icon from 'react-native-vector-icons/FontAwesome';
const coffeeIcon = (<Icon name="coffee" size={10} color="black" />)
const bookmarkIcon = (<Icon name="bookmark" size={10} color="black" />)

class Feed extends React.Component {
  constructor(){
    super(...arguments);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !is(r1, r2)
    });
    this.state ={
      isRefreshing: false,
      animationType: 'slide',
      modalVisible: true,
      transparent: true,
      language: '1'
    }
  }

  componentDidMount(){
    this.props.dispatch(getNotes(this.props.notes.get('startIndex')));
  }

  onRenderRow = (rowData, sectionID, rowID) => {
    let content = rowData.get('text');
    if(content.length > 50) {
      content = content.substring(0,49)+'...';
    }
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={() => this.props.navigator.push({name: 'detail'})}
      >
        <View style={styles.row}>
          <View style={styles.title}>
            <Text>
              {rowData.get('title')}
            </Text>
          </View>
          <View style={styles.text}>
            <Text>
              {content}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _onRefresh = () => {
    this.setState({isRefreshing: true});
    // fetchData().then(() => {
    //   this.setState({isRefreshing: false});
    // });
    console.log('---_onRefresh and make call---');
    this.props.dispatch(refreshNotes());
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 5000);
  }

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  render(){
    return (
      <View style={styles.container}>


      <Modal
        animationType={this.state.animationType}
        transparent={this.state.transparent}
        visible={this.state.modalVisible}
        onRequestClose={() => {this._setModalVisible(false)}}
        >
        <View style={[styles.container, {padding: 20, justifyContent: 'center',backgroundColor:'rgba(0, 0, 0, 0.4)'}]}>
          <View style={[{borderRadius: 10},{justifyContent: 'center',backgroundColor: '#fff', padding: 20}]}>
            <Text style={{textAlign: 'center'}}>
              话题：
            </Text>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(lang) => this.setState({language: lang})}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="13" value="13" />
              <Picker.Item label="14" value="14" />
              <Picker.Item label="15" value="15" />
              <Picker.Item label="16" value="16" />
            </Picker>

            <TouchableHighlight
              onPress={() => {this._setModalVisible(false)}}
              underlayColor="#a9d9d4">
                <Text >关闭</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


        <View style={styles.header}>
        </View>
        <ListView style={styles.list}
        refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="刷新中..."
              titleColor="gray"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }
          dataSource={this.ds.cloneWithRows(this.props.notes.get('notes').toArray())}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          renderRow={this.onRenderRow}
          contentContainerStyle={{alignItems: 'stretch'}}
          onEndReachedThreshold={10}
          onEndReached={() => {
            console.log('        ');
            console.log('onEndReached');
            console.log('hasMore', this.props.notes.get('hasMore'));
            console.log('startIndex ',this.props.notes.get('startIndex'));

            if(this.props.notes.get('hasMore')){
              console.log('---inside and make call---');
              this.props.dispatch(getNotes(this.props.notes.get('startIndex')));
            }
          }}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 2,
      borderColor: 'red'
    },
    header: {
      flex: 1,
      borderWidth: 2,
      borderColor: 'blue'
    },
    list: {
      flex: 10,
      borderWidth: 2,
      borderColor: 'yellow',
      backgroundColor: 'white'
    },
    row: {
      flex: 1,
      borderTopWidth: 8,
      borderTopColor: '#D5DADE',
      backgroundColor: 'white'
    },
    icon: {
      width: 10,
      marginRight: 15,
      alignSelf: 'center'
    },
    title: {
      flex: 1,
      alignSelf: 'center'
    },
    text: {
      flex: 1,
      alignSelf: 'center'
    }
})

Feed = connect(
  state => {
   console.log('state',state);
   return { notes: state.notes };
 },
 dispatch => {
   return { dispatch }
 }
)(Feed)


export default Feed
