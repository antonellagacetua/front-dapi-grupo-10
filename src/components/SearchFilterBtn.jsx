import React from 'react';
import {Pressable, Text} from 'react-native';

const SearchFilterBtn = ({text, onPress}) => {
  return (
    <Pressable
      style={{
        padding: 10,
        paddingVertical: 20,
        backgroundColor: '#ABB0BC',
        color: 'white',
        borderRadius: 10,
        margin: 10,
        width: '80%',
        alignItems: 'center',
      }}
      onPress={() => onPress()}>
      <Text style={{color: 'white'}}>{text}</Text>
    </Pressable>
  );
};

export default SearchFilterBtn;
