//FavoriteMovieCard.jsx
import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, Alert } from 'react-native';
import MovieInfo from './MovieInfo';
import { useFetch } from '../hooks/useFetch';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { store } from '../redux/configureStore';

const FavoriteMovieCard = ({ movieId, onFavoriteRemoved }) => {
  const [movieData, setMovieData] = useState(null);
  const { data, loading, error: fetchError } = useFetch(`https://movieplay-back.onrender.com/pelicula/${movieId}`);
  const userId = store.getState().auth.user.id;
  const idMovie = movieId;

  useEffect(() => {
    setMovieData(data);
  }, [data]);

  const handleRemoveFavorite = async () => {
    try {
      const response = await fetch(`https://movieplay-back.onrender.com/user/${userId}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: idMovie,
        }),
      });

      // Check if the movieId is still in favorites
      const checkResponse = await fetch(`https://movieplay-back.onrender.com/user/${userId}/favorite`);
      const result = await checkResponse.json();

      if (!result.favoritesIds.includes(idMovie)) {
        Alert.alert('Película eliminada de favoritos');
      } else {
        throw new Error('Movie was not removed from favorites');
      }
    } catch (error) {
      console.error(error.message);
    }
    onFavoriteRemoved(); // Notify parent to refresh favorites list
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (fetchError) {
    return <Text>Error fetching movie data: {fetchError.message}</Text>;
  }

  return (
    <View style={{ width: '100%', paddingHorizontal: 25, paddingBottom: 40 }}>
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movieData?.poster_path}` }}
          style={{
            width: '100%',
            height: 180,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
          onPress={handleRemoveFavorite}>
          <Ionicons name="close" size={24} color="white" backgroundColor="gray" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: '#223344',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontWeight: 700,
            textAlign: 'center',
          }}>
          {movieData?.title}
        </Text>
        <MovieInfo
          data={movieData}
          styles={{
            color: '#8899AA',
            marginHorizontal: 4,
          }}
        />
      </View>
    </View>
  );
};

export default FavoriteMovieCard;
