import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import LoginScreen from '../Login';
import SplashScreen from '../SplashScreen';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const currentScreen = useSelector(state => state.navigation.currentScreen);
  //console.log('Pantalla actual en redux:', currentScreen); // depuracion para saber si funciona

  return (
    <Stack.Navigator initialRouteName={currentScreen}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;