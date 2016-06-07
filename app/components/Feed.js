'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';

import { connect } from 'react-redux'
import { getNotes } from '../actions'
import {fromJS, is} from 'immutable'

import Icon from 'react-native-vector-icons/FontAwesome';
const coffeeIcon = (<Icon name="coffee" size={10} color="black" />)
const bookmarkIcon = (<Icon name="bookmark" size={10} color="black" />)

class Feed extends React.Component {
  constructor(){
    super(...arguments);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !is(r1, r2)
    })
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

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <ListView style={styles.list}
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
