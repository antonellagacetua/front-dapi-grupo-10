import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountScreen from '../Account';
import EditAccount from '../account/EditAccount';
import Close from '../account/Close';

const Stack = createNativeStackNavigator();

function AccountNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Editar Cuenta',
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
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="EditAccount" component={EditAccount} />
      <Stack.Screen
        name="Close"
        component={Close}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AccountNavigation;
