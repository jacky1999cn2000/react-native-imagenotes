'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  ListView,
  Modal,
  Picker,
  ActivityIndicatorIOS,
  TextInput
} from 'react-native';

import { connect } from 'react-redux'
import { getNotes, refreshNotes } from '../actions'
import {fromJS, is} from 'immutable'
import BackButton from './BackButton'

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
      modalVisible: false,
      transparent: true,
      language: '1',
      searchText: '',
      searchMode: false,
      dummyData: [
        {
          id: 1,
          text: 'dummyData',
          title: 'dummyTitle'
        }
      ]
    }
  }

  componentDidMount(){
    this.props.dispatch(getNotes(this.props.notes.get('startIndex')));
    //imatate loading
    // setTimeout(() => {
    //   //this.props.dispatch(getNotes(this.props.notes.get('startIndex')));
    // }, 300);

  }

  onRenderRow = (rowData, sectionID, rowID) => {
    let content = rowData.get('text');
    if(content.length > 50) {
      content = content.substring(0,49)+'...';
    }
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={() => this.props.navigator.push({name: 'detail',data:rowData})}
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
    }, 300);
  }

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  _createNew = () => {
    //this.setState({modalVisible: true});
    console.log('create new');
  }

  render(){
    let headerFlex = this.state.searchMode ? 0.22 : 0.11;
    let listFlex = this.state.searchMode ? 0.78 : 0.89;
    let searchView = this.state.searchMode ? (
      <View style={{flex: 1}}>
        <TouchableHighlight
          onPress={() => {this.setState({modalVisible:true})}}
          underlayColor="#a9d9d4">
            <Text>Choose Topic</Text>
        </TouchableHighlight>

      </View>
    ) : null;

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
                <Text>关闭</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


        <View style={[styles.header,{flex:headerFlex}]}>
          <View style={styles.searchWrapper}>
            <TextInput placeholder="Search"
              ref="searchText"
              style={styles.search}
              onFocus={() => {console.log('onFocus');this.refs.searchText.clear();this.setState({searchMode: true});}}
              onEndEditing={() => {console.log('onEndEditing');console.log(this.state.searchText);this.setState({searchMode: false});}}
              returnKeyType="search"
              onChangeText={(text) => this.setState({searchText:text})}
              value={this.state.searchText}/>
            <TouchableHighlight
              style={styles.createNew}
              onPress={() => {this.props.navigator.push({name:'newItem'});}}
              underlayColor="#a9d9d4">
                <Text> + </Text>
            </TouchableHighlight>
          </View>

            {searchView}
        </View>

        <ListView style={[styles.list,{flex:listFlex}]}
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
      marginTop: 25,
      borderWidth: 2,
      borderColor: 'red'
    },
    header: {
      // flex: 0.1,
      // justifyContent: 'center',
      alignItems: 'stretch',
      borderWidth: 2,
      borderColor: 'blue'
    },
    searchWrapper: {
      flex: 1,
      flexDirection: 'row'
    },
    search: {
      flex: 0.9,
      marginHorizontal: 5,
      marginVertical: 10,
      // height: 20,
      // width: 60,
      borderColor: 'gray',
      borderWidth: 2
    },
    createNew: {
      flex: 0.1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    list: {
      // flex: 0.9,
      borderWidth: 2,
      borderColor: 'yellow',
      backgroundColor: 'white'
    },
    row: {
      flex: 1,
      borderTopWidth: 8,
      borderTopColor: '#D5DADE',
      backgroundColor: 'white',
      overflow: 'hidden'
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
   console.log('in Feed');
   console.log('state',state);
   return { notes: state.notes };
 },
 dispatch => {
   return { dispatch }
 }
)(Feed)


export default Feed
