import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import SearchBar from '../../components/SearchBar';

function SearchScreen({navigation}) {
  const [search, setSearch] = useState('');
  const handleChange = text => {
    setSearch(text);
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchResults', {search});
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#C1DCF2',
        alignItems: 'center',
      }}>
      <SearchBar
        handleChange={handleChange}
        handleSearchPress={handleSearchPress}
      />
      <Image
        source={require('../../../assets/Not_Found_illustration.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Busca por titulo o actor</Text>
    </View>
  );
}

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
});

export default SearchScreen;
