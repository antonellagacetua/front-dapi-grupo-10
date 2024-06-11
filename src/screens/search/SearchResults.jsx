import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import SearchBar from '../../components/SearchBar';
import Error from '../../components/Error';
import MovieCard from '../../components/MovieCard';

function SearchResults({navigation, route}) {
  const {search} = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsRefreshing(true);
    fetch(
      `${process.env.API_URL}/pelicula/search/${search}?page=${currentPage}`,
    )
      .then(response => response.json())
      .then(data => {
        setSearchResults(
          new Set(data.dataMovies.results.concat(data.dataCast.results)),
        );
        setTotalPages(data.dataMovies.total_pages);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  }, [search, currentPage]);

  const handleFilterPress = () => {
    navigation.navigate('Filters');
  };

  const handlePageClick = page => {
    setCurrentPage(page);
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
          onPress={() => handlePageClick(i)}>
          <Text
            style={{
              color: currentPage === i ? '#C1DCF2' : '#3A7CA5',
              fontWeight: 'bold',
            }}>
            {i}
          </Text>
        </Pressable>,
      );
    }

    return buttons;
  };

  if (error) {
    return <Error message="Ocurrio un error al cargar el trailer" />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#C1DCF2',
        alignItems: 'center',
      }}>
      <SearchBar
        showSearchBtn={false}
        search={search}
        showFilterBtn={true}
        handleFilterPress={handleFilterPress}
        isInputDisabled={true}
      />
      {searchResults.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            padding: 20,
          }}>
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
            }}>
            No se encontraron resultados para la busqueda
          </Text>
          <Text
            style={{
              color: '#9E9E9E',
              fontSize: 16,
              textAlign: 'center',
            }}>
            Intentalo nuevamente
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            isRefreshing={isRefreshing}
            data={searchResults}
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
          />
          <View style={{flexDirection: 'row', marginTop: 20}}>
            {renderPaginationButtons()}
          </View>
        </>
      )}
    </View>
  );
}

export default SearchResults;
