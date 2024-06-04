import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';

const MovieActors = ({data}) => {
  return (
    <View>
      <Text style={{color: '#0B3750', fontSize: 12, fontWeight: '500'}}>
        ELENCO
      </Text>
      <FlatList
        data={data?.acting}
        renderItem={({item}) => (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              marginTop: 10,
              marginRight: 10,
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
      />
    </View>
  );
};

export default MovieActors;
