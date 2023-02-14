// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';

import Menu from './Menu';
import SQLiteView from '../Sqlite/index';
import LongList from '../LongList/index';
import animationView from '../animation/index';
import UIShow from '../show/index';
import TabShow from '../tab/index';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SQLite from '../../utils/sqlite';

// SQLite.open()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">{props => <Menu {...props} />}</Stack.Screen>
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name="SQLite能力演示" component={SQLiteView} />
        <Stack.Screen name="长列表" component={LongList} />
        <Stack.Screen name="动画展示" component={animationView} />
        <Stack.Screen name="UI展示" component={UIShow} />
        <Stack.Screen name="tab页面" component={TabShow} />
        <Stack.Screen name="页面跳转" component={TabShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
