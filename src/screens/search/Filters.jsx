import React from 'react';
import {Pressable, Text, View} from 'react-native';
import SearchFilterBtn from '../../components/SearchFilterBtn';

const Filters = ({route, navigation}) => {
  const {handleFilter, selectedFilter} = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C1DCF2',
      }}>
      <SearchFilterBtn
        text={'Mas populares'}
        onPress={handleFilter}
        selectedFilter={selectedFilter}
      />
      <SearchFilterBtn
        text={'Fecha de publicacion: Mas nuevo a mas viejo'}
        onPress={handleFilter}
        selectedFilter={selectedFilter}
      />
      <SearchFilterBtn
        text={'Fecha de publicacion: Mas viejo a mas nuevo'}
        onPress={handleFilter}
        selectedFilter={selectedFilter}
      />
      <SearchFilterBtn
        text={'Calificacion: De mayor a menor'}
        onPress={handleFilter}
        selectedFilter={selectedFilter}
      />
      <SearchFilterBtn
        text={'Calificacion: De menor a mayor'}
        onPress={handleFilter}
        selectedFilter={selectedFilter}
      />
    </View>
  );
};

export default Filters;
