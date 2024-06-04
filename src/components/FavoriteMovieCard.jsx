import React from 'react';
import {Image, Text, View} from 'react-native';
import MovieInfo from './MovieInfo';

const FavoriteMovieCard = ({data}) => {
  return (
    <View style={{width: '100%', paddingHorizontal: 25}}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`}}
        style={{
          width: '100%',
          height: 180,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View
        style={{
          width: '100%',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: '#223344',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontWeight: 700,
            textAlign: 'center',
          }}>
          {data?.title}
        </Text>
        <MovieInfo
          data={data}
          styles={{
            color: '#8899AA',
            marginHorizontal: 4,
          }}
        />
      </View>
    </View>
  );
};

export default FavoriteMovieCard;
