// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';


import Menu from './Menu'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {/* <Menu /> */}
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details')}
    />
  </View>
)

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
          {(props) => <HomeScreen {...props}  />}
        </Stack.Screen>

        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;