import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View, Keyboard } from 'react-native';
import SearchBar from '../../components/SearchBar';
import Error from '../../components/Error';
import MovieCard from '../../components/MovieCard';
import debounce from 'lodash.debounce';

function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Mas populares');
  const [hasMore, setHasMore] = useState(true);

  const filters = {
    'Mas populares': (array) => array.sort((a, b) => b.popularity - a.popularity),
    'Fecha de publicacion: Mas nuevo a mas viejo': (array) =>
      array.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)),
    'Fecha de publicacion: Mas viejo a mas nuevo': (array) =>
      array.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)),
    'Calificacion: De mayor a menor': (array) => array.sort((a, b) => b.vote_average - a.vote_average),
    'Calificacion: De menor a mayor': (array) => array.sort((a, b) => a.vote_average - b.vote_average),
  };

  const debouncedSearch = debounce((text) => {
    setSearch(text);
  }, 1000);

  const handleChange = (text) => {
    debouncedSearch(text);
  };

  const handleSearchPress = () => {
    Keyboard.dismiss();
    navigation.navigate('SearchResults', { search });
  };

  useEffect(() => {
    setError(null);
    if (search === '') {
      setSearchResults([]);
      return;
    }
    setIsRefreshing(true);
    const url = `https://movieplay-back.onrender.com/pelicula/search/${encodeURIComponent(search)}?page=1`;
    console.log('Fetching URL:', url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Data recibida:', data);
        if (!data.dataCast.results && !data.dataMovies.results) {
          setError('No se encontraron resultados');
          return;
        }
        if (data.dataCast.results && !data.dataMovies.results) {
          setSearchResults(data.dataCast.results);
          setTotalPages(data.dataCast.total_pages);
          return;
        }
        if (!data.dataCast.results && data.dataMovies.results) {
          setSearchResults(data.dataMovies.results);
          setTotalPages(data.dataMovies.total_pages);
          return;
        }

        setSearchResults(data.dataCast.results.concat(data.dataMovies.results));
        setTotalPages(data.dataMovies.total_pages);
      })
      .catch((err) => {
        console.error('Error al buscar:', err);
        setError(err);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  }, [search]);

  const handleFilter = (newFilter) => {
    setSelectedFilter(newFilter);
    const dataWithFilters = filters[newFilter](searchResults);
    setSearchResults([...dataWithFilters]);
    navigation.goBack();
  };

  const handleFilterPress = () => {
    Keyboard.dismiss();
    navigation.navigate('Filters', { handleFilter, selectedFilter });
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const loadMoreData = async () => {
    if (isRefreshing || !hasMore) return;

    setIsRefreshing(true);

    try {
      const response = await fetch(
        `https://movieplay-back.onrender.com/pelicula/search/${search}?page=${currentPage + 1}`
      );
      const data = await response.json();
      setSearchResults((prevResults) => [...prevResults, ...data.dataMovies.results]);
      setTotalPages(data.dataMovies.total_pages);
      setCurrentPage(currentPage + 1);
      setHasMore(data.dataMovies.page < data.dataMovies.total_pages);
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
        }}
      >
        <ActivityIndicator size="large" color="#3A7CA5" />
      </View>
    );
  };

  const renderPaginationButtons = () => {
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow + 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    const buttons = [];

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Pressable
          key={i}
          style={{
            backgroundColor: currentPage === i ? '#3A7CA5' : '#C1DCF2',
            padding: 10,
            borderRadius: 5,
            margin: 5,
          }}
          onPress={() => handlePageClick(i)}
        >
          <Text
            style={{
              color: currentPage === i ? '#C1DCF2' : '#3A7CA5',
              fontWeight: 'bold',
            }}
          >
            {i}
          </Text>
        </Pressable>
      );
    }

    return buttons;
  };

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: '#C1DCF2' }}>
        <SearchBar
          handleChange={handleChange}
          handleSearchPress={handleSearchPress}
          showFilterBtn={true}
          handleFilterPress={handleFilterPress}
          showSearchBtn={search === ''}
        />
        <Error message="No se obtuvieron resultados" />
      </View>
    );
  }

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <SearchBar
        handleChange={handleChange}
        handleSearchPress={handleSearchPress}
        showFilterBtn={true}
        handleFilterPress={handleFilterPress}
        showSearchBtn={search === ''}
      />
      {search === '' && (
        <>
          <Image
            source={require('../../../assets/Not_Found_illustration.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Busca por titulo o actor</Text>
        </>
      )}

      {search !== '' && searchResults.length === 0 && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            padding: 20,
          }}
        >
          <Image
            source={require('../../../assets/notfoundmovies-removebg-preview.png')}
            style={{
              width: 230,
              height: 230,
            }}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            No se encontraron resultados para la busqueda
          </Text>
          <Text
            style={{
              color: '#9E9E9E',
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            Intentalo nuevamente
          </Text>
        </View>
      )}
      {search !== '' && searchResults.length > 0 && (
        <>
          <FlatList
            isRefreshing={isRefreshing}
            data={searchResults}
            style={{ marginTop: 50 }}
            renderItem={({ item }) => (
              <MovieCard
                item={item}
                navigation={navigation}
                width={113}
                height={148}
                styles={{ marginHorizontal: 10, borderRadius: 10 }}
                title={true}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
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
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1DCF2',
    alignItems: 'center',
  },
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

export default SearchScreen;
