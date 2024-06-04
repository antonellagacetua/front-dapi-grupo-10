import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MoviePoster = ({data, navigation}) => {
  return (
    <View style={{position: 'relative'}}>
      <Pressable
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 10,
        }}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-circle" size={30} color="#0B3750" />
      </Pressable>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          zIndex: 11,
          flexDirection: 'row',
          gap: 5,
          padding: 5,
          paddingHorizontal: 10,
          borderRadius: 30,
          backdropFilter: 'blur(10px)',
        }}>
        <Ionicons name="star" size={20} color="#FFD700" />
        <Text style={{color: '#0B3750', fontSize: 16, fontWeight: 'bold'}}>
          {(data?.vote_average / 2).toFixed(0)}
        </Text>
      </View>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data?.backdrop_path}`,
        }}
        style={{width: '100%', height: 337, objectFit: 'cover'}}
      />
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
        }}
        style={{
          width: 120,
          height: 180,
          position: 'absolute',
          top: 150,
          right: 10,
          zIndex: 10,
        }}
      />
    </View>
  );
};

export default MoviePoster;
