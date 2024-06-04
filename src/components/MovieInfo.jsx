import React from 'react';
import {Text, View} from 'react-native';

const MovieInfo = ({data, styles}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
      }}>
      <Text style={styles}>{new Date(data?.release_date).getFullYear()}</Text>
      <Text style={styles}> | </Text>
      <Text style={styles}>
        {Math.floor(data?.runtime / 60)}h {data?.runtime % 60} min
      </Text>
      <Text style={styles}> | </Text>
      <Text style={styles}>
        {data?.genres
          .map(el => el.name)
          .slice(0, 2)
          .join(' / ')}
      </Text>
    </View>
  );
};

export default MovieInfo;
