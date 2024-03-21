import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AvatarSelectionScreen from './screens/AvatarSelection';
import WaitScreen from './screens/WaitScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AvatarSelection" component={AvatarSelectionScreen} />
        <Stack.Screen name="WaitScreen" component={WaitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;