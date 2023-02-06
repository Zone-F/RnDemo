// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';


import Menu from './Menu'
import SQLiteView from '../Sqlite/index'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"  >
          {(props) => <Menu {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="SQLiteView" component={SQLiteView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;