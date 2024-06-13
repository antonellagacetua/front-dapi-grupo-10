import React from 'react';
import {Pressable, Text} from 'react-native';

const SearchFilterBtn = ({text, onPress, selectedFilter}) => {
  return (
    <Pressable
      style={{
        padding: 10,
        paddingVertical: 20,
        color: 'white',
        borderRadius: 10,
        margin: 10,
        width: '80%',
        alignItems: 'center',
        backgroundColor: selectedFilter === text ? '#FF407D' : '#ABB0BC',
      }}
      onPress={() => onPress(text)}>
      <Text style={{color: 'white'}}>{text}</Text>
    </Pressable>
  );
};

export default SearchFilterBtn;