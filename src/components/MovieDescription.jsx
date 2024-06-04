import React from 'react';
import {Text, View} from 'react-native';

const MovieDescription = ({data}) => {
  return (
    <View>
      <Text
        style={{
          color: '#0B3750',
          fontSize: 12,
          fontWeight: 'bold',
          paddingHorizontal: 20,
          marginTop: 10,
          marginBottom: 5,
          textTransform: 'uppercase',
        }}>
        "{data?.tagline || data?.title}"
      </Text>
      <Text
        style={{
          color: '#0B3750',
          fontSize: 12,
          paddingHorizontal: 20,
        }}>
        {data?.overview}
      </Text>
    </View>
  );
};

export default MovieDescription;
