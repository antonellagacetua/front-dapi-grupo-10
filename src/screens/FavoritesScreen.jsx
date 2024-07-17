//FavoritesScreen.jsx
import {store} from '../redux/configureStore';
import React, {useEffect, useState, useCallback} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FavoriteMovieCard from '../components/FavoriteMovieCard';
import {useFocusEffect} from '@react-navigation/native';

function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false); // State to trigger refresh
  const userId = store.getState().auth.user.id;

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await fetch(
        `https://movieplay-back.onrender.com/user/${userId}/favorite`,
      );
      if (!response.ok) {
        throw new Error('Error fetching favorites');
      }
      const result = await response.json();
      console.log('Fetched favorites:', result?.favoritesIds);
      setFavorites(result?.favoritesIds || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      Alert.alert('Ocurrió un error al obtener los favoritos');
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId, fetchFavorites]);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites]),
  );

  const handleRemoveFavorite = useCallback(
    async movieId => {
      fetchFavorites();
    },
    [fetchFavorites],
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#C1DCF2'}}>
      <View style={{alignItems: 'center', marginTop: 40}}>
        {favorites.length > 0 ? (
          favorites.map(movieId => (
            <FavoriteMovieCard
              navigation={navigation}
              key={movieId}
              movieId={movieId}
              onFavoriteRemoved={() => handleRemoveFavorite(movieId)}
            />
          ))
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
                fontWeight: '500',
                marginBottom: 10,
              }}>
              No hay favoritos
            </Text>
            <Text
              style={{
                color: '#9E9E9E',
                fontSize: 16,
                fontWeight: '400',
              }}>
              ¡Agrega tus trailers favoritos aquí!
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default FavoritesScreen;
