import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const SplashSlide = ({img, text}) => {
  return (
    <View style={styles.slide}>
      <Image source={img} style={styles.image} />
      <Text style={styles.imageText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '90%',
    height: '70%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  imageText: {
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 24,
    textAlign: 'center',
    color: '#0B3750',
  },
});

export default SplashSlide;
