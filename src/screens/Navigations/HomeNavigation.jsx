import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Home/HomeScreen';
import Genres from '../Home/Genres';
import MovieScreen from '../Home/MovieScreen';
import GenresResults from '../Home/GenresResults';

const Stack = createNativeStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#C1DCF2',
          height: 101,
        },
        headerTintColor: '#0B3750',
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%',
        },
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieScreen"
        component={MovieScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GenresScreen"
        component={Genres}
        options={{
          headerTitle: 'Géneros',
        }}
      />
      <Stack.Screen name="GenresResults" component={GenresResults} />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
