import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../FavoritesScreen';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignicons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityicons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountNavigation from './AccountNavigation';
import SearchNavigation from './SearchNavigation';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 57, height: 45}}
      source={require('../../../assets/appicon.jpg')}
    />
  );
}

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#16425B',
        tabBarInactiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#3A7CA5',
        tabBarInactiveBackgroundColor: '#3A7CA5',
        tabBarStyle: {
          borderTopColor: '#3A7CA5',
          borderTopWidth: 0,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          headerShown: false,
          headerTitle: props => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3A7CA5',
            height: 101,
          },
          headerTintColor: 'red',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color, size}) => (
            <AntDesignicons name="videocamera" color={color} size={size} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          headerShown: false,
          headerTitle: 'Busqueda',
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
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" color={color} size={size} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerShown: true,
          headerTitle: 'Favoritos',
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
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="AccountNavigation"
        component={AccountNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityicons
              name="account-circle-outline"
              color={color}
              size={size}
            />
          ),
          tabBarLabel: () => null,
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
