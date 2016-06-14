'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Navigator
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import Feed from './Feed'

class App extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      selectedTab: 'feed'
    };
  }

  render(){
    return (
      <TabBarIOS style={styles.container}>
        <Icon.TabBarItemIOS
          title="首页"
          selected={this.state.selectedTab == 'feed'}
          iconName="fire"
          onPress={() => this.setState({selectedTab: 'feed'}) }>

          <Feed route={this.props.route} navigator={this.props.navigator}/>

        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="发现"
          selected={this.state.selectedTab == 'discovery'}
          iconName="gift"
          onPress={() => this.setState({selectedTab: 'discovery'})}>
          <Text>
            Tab 2
          </Text>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="通知"
          selected={this.state.selectedTab == 'notification'}
          iconName="paper-plane"
          onPress={() => this.setState({selectedTab: 'notification'})}>
          <Text>
            Tab 3
          </Text>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    )
  }

}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
