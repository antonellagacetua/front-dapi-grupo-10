import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import StackNavigation from './src/screens/Navigations/StackNavigation.jsx';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/configureStore.js';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import Error from './src/components/Error.jsx';
import {setCurrentScreen} from './src/redux/navigationSlice';

function AppContent() {
  const [isConnected, setIsConnected] = useState(true);
  const dispatch = useDispatch();
  const currentScreen = useSelector(state => state.navigation.currentScreen);

  useEffect(() => {
    SplashScreen.hide();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return <Error message={'No hay conexion a internet'} />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer
        onStateChange={(state) => {
          if (state && state.routes.length > 0) {
            const currentRoute = state.routes[state.routes.length - 1];
            //console.log('Navegando en:', currentRoute.name); ver en que pantalla estoy
            dispatch(setCurrentScreen(currentRoute.name));
          }
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#3A7CA5" />
        <StackNavigation initialRouteName={currentScreen} />
      </NavigationContainer>
    </SafeAreaView>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;