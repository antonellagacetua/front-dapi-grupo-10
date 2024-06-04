import React from 'react';
import {Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MovieActionBtn = ({icon, size, color, text, styles}) => {
  return (
    <Pressable
      style={{
        backgroundColor: '#0B3750',
        padding: 5,
        borderRadius: 5,
        ...styles,
      }}>
      {text && <Text style={{color: 'white', fontSize: 14}}>{text}</Text>}
      {icon && <Ionicons name={icon} size={size} color={color} />}
    </Pressable>
  );
};

export default MovieActionBtn;
