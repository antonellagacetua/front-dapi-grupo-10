import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieScreen from '../Home/MovieScreen';
import FavoritesScreen from '../FavoritesScreen';

const Stack = createNativeStackNavigator();

function FavoritesNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: 'Favoritos',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#C1DCF2',
          height: 101, // Increase height
        },
        headerTitleAlign: 'center',
        headerTintColor: '#0B3750',
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%',
        },
      }}>
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Stack.Screen
        name="MovieScreen"
        component={MovieScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default FavoritesNavigation;
