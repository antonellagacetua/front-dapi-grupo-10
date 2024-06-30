import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
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

const MovieScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { data, loading, error } = useFetch(`https://movieplay-back.onrender.com/pelicula/${id}`);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }, [isFullScreen]);

  const handleTrailerPress = () => {
    setShowTrailer(!showTrailer);
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
        }}
      >
        <MoviePoster data={data} navigation={navigation} />
        <View>
          <Text
            style={{
              color: '#0B3750',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingHorizontal: 20,
            }}
          >
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
            }}
          >
            {data?.trailerKey && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#0B3750',
                  padding: 5,
                  borderRadius: 5,
                  ...styles,
                  paddingHorizontal: 40,
                }}
                onPress={handleTrailerPress}
              >
                <Text style={{ color: 'white' }}>Trailer</Text>
              </TouchableOpacity>
            )}
            <MovieActionBtn icon="heart-outline" size={20} color="white" />
            <MovieActionBtn icon="star-outline" size={20} color="white" />
            <MovieActionBtn icon="share-social" size={20} color="white" />
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
          <MovieTrailer videoId={data.trailerKey} onFullScreenChange={setIsFullScreen} />
          <TouchableOpacity style={styles.closeButton} onPress={handleTrailerPress}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
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
