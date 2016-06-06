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
// import { toggleTodo } from '../actions'
import {fromJS, is} from 'immutable'

import Icon from 'react-native-vector-icons/FontAwesome';
const coffeeIcon = (<Icon name="coffee" size={10} color="black" />)
const bookmarkIcon = (<Icon name="bookmark" size={10} color="black" />)

let dummyData = fromJS(
  [
    {
      id: '1',
      title: 'title1',
      completed: true
    },
    {
      id: '2',
      title: 'title2',
      completed: true
    },
    {
      id: '3',
      title: 'title3',
      completed: true
    },
    {
      id: '4',
      title: 'title4',
      completed: true
    },
    {
      id: '5',
      title: 'title5',
      completed: true
    },
  ]
);

class Feed extends React.Component {
  constructor(){
    super(...arguments);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !is(r1, r2)
    })
  }

  render(){
    return (
      <ListView style={styles.list}
        dataSource={this.ds.cloneWithRows(dummyData.toArray())}
        enableEmptySections={true}
        renderRow={this.onRenderRow} />
    )
  }

  onRenderRow = (rowData, sectionID, rowID) => {
    let textStyle = {
      textDecorationLine: rowData.get('completed') ? 'line-through' : 'none'
    };
    let myIcon = rowData.get('completed') ? coffeeIcon : bookmarkIcon;

    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={() => this.props.navigator.push({name: 'detail'})}
      >
        <View style={styles.row}>
          <View style={styles.icon}>
            {myIcon}
          </View>
          <View style={styles.item}>
            <Text style={textStyle}>
              {rowData.get('title')}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

}

const styles = StyleSheet.create({
    list: {
      flex: 1,
      padding: 30
    },
    row: {
      margin: 8,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    icon: {
      width: 10,
      marginRight: 15,
      alignSelf: 'center'
    },
    item: {
      flex: 1,
      alignSelf: 'center'
    }
})

Feed = connect()(Feed)

export default Feed
