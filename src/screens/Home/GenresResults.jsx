import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MovieCard from '../../components/MovieCard';

const GenresResults = ({navigation, route}) => {
  const {
    genre: {id, name},
  } = route.params;
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setError(null);

    const url = `https://movieplay-back.onrender.com/pelicula/genre/${id}`;
    setIsRefreshing(true);
    fetch(`${url}?page=1`)
      .then(response => response.json())
      .then(data => {
        setResults(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(err => {
        console.error('Error al filtrar:', err);
        setError(err);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  }, [id]);

  useEffect(() => {
    navigation.setOptions({title: name});
  }, [name, navigation]);

  const loadMoreData = async () => {
    if (isRefreshing || !hasMore) return;

    setIsRefreshing(true);

    const url = `https://movieplay-back.onrender.com/pelicula/genre/${id}`;

    try {
      const response = await fetch(`${url}?page=${currentPage + 1}`);
      const data = await response.json();
      setResults(prevResults => [...prevResults, ...data.results]);
      setTotalPages(data.total_pages);
      setCurrentPage(currentPage + 1);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderFlatListFooter = () => {
    if (!isRefreshing) return null;

    return (
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#3A7CA5" />
      </View>
    );
  };

  if (error) {
    return (
      <View style={{flex: 1, backgroundColor: '#C1DCF2'}}>
        <Text style={{color: '#000', fontSize: 18, textAlign: 'center'}}>
          Error al cargar los datos
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#C1DCF2',
        alignItems: 'center',
      }}>
      <>
        <FlatList
          isRefreshing={isRefreshing}
          data={results}
          style={{marginTop: 50}}
          renderItem={({item}) => (
            <MovieCard
              item={item}
              navigation={navigation}
              width={113}
              height={148}
              styles={{marginHorizontal: 10, borderRadius: 10}}
              title={true}
            />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFlatListFooter}
        />
        {isRefreshing && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#3A7CA5" />
          </View>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 246,
    height: 237,
    marginTop: 150,
  },
  text: {
    color: '#0B3750',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'medium',
  },
  spinnerContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GenresResults;