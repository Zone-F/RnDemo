// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';

import Menu from './Menu';
import SQLiteView from '../Sqlite/index';
import LongList from '../LongList/index';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SQLite from '../../utils/sqlite';

// SQLite.open()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">{props => <Menu {...props} />}</Stack.Screen>
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name="SQLiteView" component={SQLiteView} />
        <Stack.Screen name="LongList" component={LongList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
