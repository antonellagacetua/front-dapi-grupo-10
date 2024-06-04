import React, {useEffect} from 'react';
import {Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Close = ({navigation, route}) => {
  const {action} = route.params;

  useEffect(() => {
    const nav = () => {
      navigation.replace('Login');
    };
    setTimeout(nav, 3000);

    return () => {
      clearTimeout(nav);
    };
  }, []);

  return (
    <LinearGradient
      colors={['#C1DCF2', '#6C9BC1', '#3A7CA5']}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
      }}>
      <Image
        source={require('../../../assets/close.png')}
        style={{width: 200, height: 200, zIndex: 9999}}
      />
      <Text
        style={{
          color: '#0B3750',
          fontSize: 18,
          marginTop: 150,
        }}>
        {action === 'close' ? 'Cerraste sesion' : 'Eliminaste tu cuenta'}{' '}
        exitosamente
      </Text>
      <Text
        style={{
          color: '#FFF2E0',
          fontSize: 16,
          marginTop: 10,
          textAlign: 'center',
        }}>
        Seras redirigido a la pagina principal
      </Text>
    </LinearGradient>
  );
};

export default Close;
