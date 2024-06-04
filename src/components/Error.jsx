import React from 'react';
import {Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Error = ({message, style}) => {
  return (
    <LinearGradient
      colors={['#C1DCF2', '#3A7CA5', '#6C9BC1']}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../assets/No-Connection-illustartion.png')}
        style={{
          width: 250,
          height: 250,
          marginHorizontal: 'auto',
        }}
      />
      <Text
        style={{
          color: '#0B3750',
          fontWeight: 'bold',
          fontSize: 18,
          marginTop: 50,
        }}>
        {message || 'No se pudo cargar la información'}
      </Text>
    </LinearGradient>
  );
};

export default Error;
