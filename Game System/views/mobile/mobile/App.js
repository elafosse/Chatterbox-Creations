import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AvatarSelectionScreen from './screens/AvatarSelection';
import WaitScreen from './screens/WaitScreen';
import HostStartScreen from './screens/HostStartScreen';
import CatagorySelection from './screens/CatagorySelection';
import PriceSelection from './screens/PriceSelection';
import AnswerScreen from './screens/AnswerScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AvatarSelection" component={AvatarSelectionScreen} />
        <Stack.Screen name="WaitScreen" component={WaitScreen} />
        <Stack.Screen name="HostStartScreen" component={HostStartScreen} />
        <Stack.Screen name="CatagorySelection" component={CatagorySelection} />
        <Stack.Screen name="PriceSelection" component={PriceSelection} />
        <Stack.Screen name="AnswerScreen" component={AnswerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;