import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useFetch} from '../../hooks/useFetch';

const Genres = () => {
  const {data} = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=f14ce6e8c9f072c946514db4263511ca&language=es-ES`,
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C1DCF2',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
      }}>
      <View
        style={{
          marginTop: 250,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#C1DCF2',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
        }}>
        <Pressable
          style={{
            paddingVertical: 10,
            backgroundColor: '#ABB0BC',
            color: 'white',
            borderRadius: 10,
            margin: 4,
            width: '25%',
            alignItems: 'center',
          }}
          onPress={() => {}}>
          <Text style={{color: 'white'}}>Todos</Text>
        </Pressable>
        {data?.genres.map(genre => (
          <Pressable
            key={genre.id}
            style={{
              paddingVertical: 10,
              backgroundColor: '#ABB0BC',
              color: 'white',
              borderRadius: 10,
              margin: 4,
              width: '25%',
              alignItems: 'center',
            }}
            onPress={() => {}}>
            <Text style={{color: 'white'}}>{genre.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Genres;
