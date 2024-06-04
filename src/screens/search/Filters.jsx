import React from 'react';
import {Pressable, Text, View} from 'react-native';
import SearchFilterBtn from '../../components/SearchFilterBtn';

const Filters = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C1DCF2',
      }}>
      <SearchFilterBtn text={'Mas relevantes'} onPress={() => {}} />
      <SearchFilterBtn
        text={'Fecha de publicacion: Mas nuevo a mas viejo'}
        onPress={() => {}}
      />
      <SearchFilterBtn
        text={'Fecha de publicacion: Mas viejo a mas nuevo'}
        onPress={() => {}}
      />
      <SearchFilterBtn
        text={'Calificacion: De mayor a menor'}
        onPress={() => {}}
      />
      <SearchFilterBtn
        text={'Calificacion: De menor a mayor'}
        onPress={() => {}}
      />
    </View>
  );
};

export default Filters;
