import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../search/SearchScreen';
import SearchResults from '../search/SearchResults';
import Filters from '../search/Filters';

const Stack = createNativeStackNavigator();

function SearchNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Busqueda',
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
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="Filters"
        component={Filters}
        options={{headerTitle: 'Ordernar por'}}
      />
    </Stack.Navigator>
  );
}

export default SearchNavigation;
