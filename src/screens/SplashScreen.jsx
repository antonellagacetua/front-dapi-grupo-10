import React, {useRef, useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import SplashSlide from '../components/SplashSlide';

const SplashScreen = ({navigation}) => {
  const swiperRef = useRef(null);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(true);

  const handleNext = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.state.index;
      if (currentIndex === 2) {
        setIsLastSlide(true);
        setShowSkipButton(false);
        handleContinue();
      } else {
        setIsLastSlide(false);
        swiperRef.current.scrollBy(1, true);
      }
    }
  };

  const handleContinue = () => {
    if (navigation) {
      navigation.replace('Tab');
    }
  };

  const handleSkip = () => {
    // if (swiperRef.current) {
    //   setIsLastSlide(true);
    //   swiperRef.current.scrollBy(2, true);
    // }
    if (navigation) {
      navigation.replace('Tab');
    }
  };

  return (
    <LinearGradient
      colors={['#C1DCF2', '#6C9BC1', '#3A7CA5']}
      style={styles.container}>
      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        onIndexChanged={index => setIsLastSlide(index === 2)}>
        <SplashSlide
          img={require('../../assets/splash1.jpg')}
          text="Explora los avances más impactantes del cine"
        />
        <SplashSlide
          img={require('../../assets/splash2.jpg')}
          text="Descubre, puntúa y guarda tus avances favoritos del cine"
        />

        <SplashSlide
          img={require('../../assets/splash3.jpg')}
          text="¡La experiencia del cine en tus manos!"
        />
      </Swiper>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={isLastSlide ? handleContinue : handleNext}>
          <Text style={styles.buttonText}>
            {isLastSlide ? 'Comenzar!' : 'Siguiente'}
          </Text>
        </TouchableOpacity>
        {!isLastSlide && showSkipButton && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Omitir</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {},
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
  bottomContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 30,
    backgroundColor: '#3A7CA5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipText: {
    fontWeight: 'bold',
    marginBottom: 0,
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#FFFFFF',
  },
});

export default SplashScreen;
