import React from 'react';
import {Text, View} from 'react-native';

const MovieDirectors = ({data}) => {
  return (
    <>
      <Text style={{color: '#0B3750', fontSize: 12, fontWeight: '500'}}>
        DIRIGIDO POR
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {data?.directing.map(el => (
          <Text key={el.id} style={{fontSize: 14, fontWeight: 700}}>
            {el.name}
          </Text>
        ))}
      </View>
    </>
  );
};

export default MovieDirectors;
