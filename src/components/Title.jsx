import React from 'react';
import {Text} from 'react-native';

const Title = ({text, styles}) => {
  return (
    <Text
      style={{
        ...styles,
        color: '#0B3750',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 20,
      }}>
      {text}
    </Text>
  );
};

export default Title;
