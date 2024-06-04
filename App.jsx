import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import StackNavigation from './src/screens/Navigations/StackNavigation.jsx';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/configureStore.js';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="#3A7CA5" />
            <StackNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;
