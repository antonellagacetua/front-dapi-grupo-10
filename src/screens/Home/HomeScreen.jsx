import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useFetch} from '../../hooks/useFetch';
import Error from '../../components/Error';
import MovieCard from '../../components/MovieCard';
import Title from '../../components/Title';

function HomeScreen({navigation}) {
  // const {data} = useFetch(
  //   'https://api.themoviedb.org/3/trending/all/day?language=es-ES&api_key=f14ce6e8c9f072c946514db4263511ca',
  // );

  const {data, loading, error} = useFetch(
    `${process.env.API_URL}/pelicula/mainlist/1`,
  );
  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useFetch(`${process.env.API_URL}/pelicula/mainlist/2`);

  if (error || error2) {
    return <Error message="Ocurrio un error al cargar los trailers" />;
  }
  return (
    <View style={styles.container}>
      <Title text={'Nuevo trailer'} styles={styles} />

      <MovieCard
        item={data?.results[0]}
        width={342}
        height={187}
        styles={{
          marginHorizontal: 'auto',
          borderRadius: 20,
        }}
        navigation={navigation}
      />
      <View style={styles.genreContainer}>
        <Title text={'Ultimos trailers'} styles={styles} />
        <Pressable onPress={() => navigation.navigate('GenresScreen')}>
          <Text style={styles.genreButton}>Genero: todos</Text>
        </Pressable>
      </View>
      <FlatList
        isRefreshing={loading}
        data={data?.results}
        renderItem={({item}) => (
          <MovieCard
            item={item}
            width={140}
            height={160}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
      />
      <FlatList
        isRefreshing={loading2}
        data={data2?.results}
        renderItem={({item}) => (
          <MovieCard
            item={item}
            width={140}
            height={160}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1DCF2',
    paddingHorizontal: 15,
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genreButton: {
    backgroundColor: '#FF407D',
    paddingHorizontal: 5,
    textTransform: 'uppercase',
    color: '#0B3750',
    fontSize: 12,
    borderRadius: 20,
  },
});

export default HomeScreen;
