import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useFetch} from '../../hooks/useFetch';
import Error from '../../components/Error';
import MovieActionBtn from '../../components/MovieActionBtn';
import MovieDescription from '../../components/MovieDescription';
import MovieDirectors from '../../components/MovieDirectors';
import MovieActors from '../../components/MovieActors';
import MoviePoster from '../../components/MoviePoster';
import MovieInfo from '../../components/MovieInfo';

const MovieScreen = ({navigation, route}) => {
  const {id} = route.params;
  const {data, loading, error} = useFetch(
    `${process.env.API_URL}/pelicula/${id}`,
  );

  if (error) {
    return <Error message="Ocurrio un error al cargar el trailer" />;
  }
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#C1DCF2',
      }}>
      <MoviePoster data={data} navigation={navigation} />
      <View>
        <Text
          style={{
            color: '#0B3750',
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingHorizontal: 20,
          }}>
          {data?.title}
        </Text>
        <MovieInfo data={data} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            gap: 10,
          }}>
          <MovieActionBtn text={'Trailer'} styles={{paddingHorizontal: 40}} />
          <MovieActionBtn icon={'heart-outline'} size={20} color={'white'} />
          <MovieActionBtn icon={'star-outline'} size={20} color={'white'} />
          <MovieActionBtn icon={'share-social'} size={20} color={'white'} />
        </View>
      </View>
      <MovieDescription data={data} />
      {data?.directing && (
        <View style={{paddingHorizontal: 20, marginVertical: 20, gap: 10}}>
          <MovieDirectors data={data} />
          {data?.acting && <MovieActors data={data} />}
        </View>
      )}
    </ScrollView>
  );
};

export default MovieScreen;
