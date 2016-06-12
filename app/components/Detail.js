'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux'
import { getNotes } from '../actions'

class Detail extends React.Component {
  constructor(){
    super(...arguments);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !is(r1, r2)
    });
    this.state = {
      fullVersion: false
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.props.dispatch(getNotes(0));
    }, 300);

  }

  onRenderRow = (rowData, sectionID, rowID) => {
    let content = rowData.get('text');
    if(content.length > 50) {
      content = content.substring(0,49)+'...';
    }
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={() => {console.log('pressed');}}
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
    let title = this.props.route.data.get('title');
    let content = this.props.route.data.get('text');
    let id = this.props.route.data.get('id');

    // if(content.length > 50) {
    //   content = content.substring(0,49)+'...';
    // }
    if(!this.state.fullVersion){
      content = content.substring(0,49)+'...';
    }

    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.question}>

            <TouchableHighlight
              onPress={() => {this.setState({fullVersion: !this.state.fullVersion})}}
            >
              <View>
                <Text>
                  id: {id}
                </Text>
                <Text>
                  title: {title}
                </Text>
                <Text>
                  content: {content}
                </Text>
                <Text>
                  Press Me
                </Text>
              </View>

            </TouchableHighlight>
          </View>

          <ListView style={styles.list}
            dataSource={this.ds.cloneWithRows(this.props.notes.get('notes').toArray())}
            automaticallyAdjustContentInsets={false}
            enableEmptySections={true}
            renderRow={this.onRenderRow}
            contentContainerStyle={{alignItems: 'stretch'}}

          />
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subcontainer:{
    flex: 1,
    marginTop: 40
  },
  question: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  answers:{
    flex: 2,
    backgroundColor: 'blue'
  }
})

Detail = connect(
  state => {
   console.log('in Detail');
   console.log('state',state);
   return { notes: state.notes };
 },
 dispatch => {
   return { dispatch }
 }
)(Detail)

export default Detail
