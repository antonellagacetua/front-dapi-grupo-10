//MovieScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { store } from '../../redux/configureStore';
import { useFetch } from '../../hooks/useFetch';
import Error from '../../components/Error';
import MovieActionBtn from '../../components/MovieActionBtn';
import MovieDescription from '../../components/MovieDescription';
import MovieDirectors from '../../components/MovieDirectors';
import MovieActors from '../../components/MovieActors';
import MoviePoster from '../../components/MoviePoster';
import MovieInfo from '../../components/MovieInfo';
import MovieTrailer from '../../components/MovieTrailer';
import Orientation from 'react-native-orientation-locker';
import MovieRating from '../../components/MovieRating';
import Share from 'react-native-share';

const MovieScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { data, loading, error } = useFetch(`https://movieplay-back.onrender.com/pelicula/${id}`);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const userId = store.getState().auth.user.id;

  useEffect(() => {
    if (isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }, [isFullScreen]);

  // Fetch favorites and check if current movie is in favorites
  const fetchFavorites = async () => {
    try {
      const response = await fetch(`https://movieplay-back.onrender.com/user/${userId}/favorite`);
      const result = await response.json();
      console.log('Fetched favorites:', result.favoritesIds);
      console.log('Movie ID:', id);
      setFavorites(result.favoritesIds);
      setIsFavorite(result.favoritesIds.includes(id.toString()));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [id, userId]);

  // Use useFocusEffect to refetch data when screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, [navigation])
  );

  const handleTrailerPress = () => {
    setShowTrailer(!showTrailer);
  };

  const handleRate = async (rate) => {
    try {
      const response = await fetch(`https://movieplay-back.onrender.com/pelicula/${id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: rate,
        }),
      });
      const json = await response.json();
      if (json.success) {
        Alert.alert('Gracias por puntuar la película');
        setIsRating(false);
      } else {
        Alert.alert('Ocurrió un error al puntuar la película');
      }
    } catch (error) {
      Alert.alert('Ocurrió un error al puntuar la película');
    }
  };

  const handleIsRating = () => {
    setIsRating(!isRating);
  };

  const handleFavoritePress = async () => {
    try {
      setIsFavorite(!isFavorite); // Toggle immediate UI update assuming success

      let response;
      if (isFavorite) {
        // Remove from favorites
        response = await fetch(`https://movieplay-back.onrender.com/user/${userId}/favorite/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Add to favorites
        response = await fetch(`https://movieplay-back.onrender.com/user/${userId}/favorite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            movieId: id,
          }),
        });
      }

      if (response.ok) {
        if (isFavorite) {
          Alert.alert('Película eliminada de favoritos');
        } else {
          Alert.alert('Película agregada a favoritos');
        }
        fetchFavorites(); // Update favorites list after success
      } else {
        setIsFavorite(!isFavorite); // Revert UI update if request fails
        Alert.alert('Ocurrió un error en la solicitud al servidor');
      }
    } catch (error) {
      setIsFavorite(!isFavorite); // Revert UI update if an error occurs
      Alert.alert('Ocurrió un error al procesar la solicitud');
    }
  };

  if (error) {
    return <Error message="Ocurrió un error al cargar el trailer" />;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
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
            <TouchableOpacity
              style={{
                backgroundColor: '#0B3750',
                padding: 5,
                borderRadius: 5,
                paddingHorizontal: 40,
              }}
              onPress={() => {
                data?.trailerKey
                  ? handleTrailerPress()
                  : Alert.alert('Esta película no tiene trailer');
              }}>
              <Text style={{ color: 'white' }}>Trailer</Text>
            </TouchableOpacity>
            <MovieActionBtn
              icon={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? "yellow" : "white"}
              onPress={handleFavoritePress}
            />
            <MovieActionBtn
              icon="star-outline"
              size={20}
              color="white"
              onPress={() => handleIsRating()}
            />
            <MovieActionBtn
              icon="share-social"
              size={20}
              color="white"
              onPress={() => {
                Share.open({
                  title: 'Compartir',
                  message: `Mira la película ${data.title} en MoviePlay`,
                })
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    err && console.log(err);
                  });
              }}
            />
          </View>
        </View>
        <MovieDescription data={data} />
        {data?.directing && (
          <View style={{ paddingHorizontal: 20, marginVertical: 20, gap: 10 }}>
            <MovieDirectors data={data} />
            {data?.acting && <MovieActors data={data} />}
          </View>
        )}
      </ScrollView>
      {showTrailer && (
        <View style={styles.overlay}>
          <MovieTrailer
            videoId={data.trailerKey}
            onFullScreenChange={setIsFullScreen}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleTrailerPress}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}
      {isRating && (
        <View style={styles.overlay}>
          <MovieRating 
          handleClose={handleIsRating} 
          handleRate={handleRate} 
          voteCount={data.vote_count}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default MovieScreen;
