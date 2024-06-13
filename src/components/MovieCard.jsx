import React from 'react';
import {Image, Pressable, Text} from 'react-native';
import { noPoster } from '../assets/noposter.js';

const MovieCard = ({
  navigation,
  item,
  width,
  height,
  styles,
  title = false,
}) => {
  return (
    <Pressable
      onPress={() => navigation.navigate('MovieScreen', {id: item?.id})}
      style={{flexDirection: 'column', alignItems: 'center'}}>
      <Image
        source={{
          uri: item?.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
            : `data:image/png;base64,${noPoster}`,
        }}
        style={{width, height, marginHorizontal: 5, ...styles}}
      />
      {title && (
        <Text
          style={{
            maxWidth: 85,
            marginBottom: 10,
            textAlign: 'center',
          }}>
          {item?.title}
        </Text>
      )}
    </Pressable>
  );
};

export default MovieCard;
