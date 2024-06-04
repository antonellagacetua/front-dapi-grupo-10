import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import FavoriteMovieCard from '../components/FavoriteMovieCard';
import {useFetch} from '../hooks/useFetch';

function FavoritesScreen() {
  const {data} = useFetch(
    'https://api.themoviedb.org/3/movie/550?api_key=f14ce6e8c9f072c946514db4263511ca',
  );
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#C1DCF2',
      }}>
      <View style={{alignItems: 'center'}}>
        {data ? (
          <>
            <FavoriteMovieCard data={data} />
          </>
        ) : (
          <>
            <Image
              style={{width: 250, height: 250, marginBottom: 20}}
              source={require('../../assets/No-Favorite-illustration.png')}
            />
            <Text
              style={{
                color: '#0B3750',
                fontSize: 18,
                fontWeight: 500,
                marginBottom: 10,
              }}>
              No hay favoritos
            </Text>
            <Text
              style={{
                color: '#9E9E9E',
                fontSize: 16,
                fontWeight: 400,
              }}>
              ¡Agrega tus trailers favoritos aca!
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default FavoritesScreen;
