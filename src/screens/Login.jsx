import React, {useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {fetchLogin} from '../redux/slices/authSlice';
import {useDispatch} from 'react-redux';

const CLIENT_ID =
  '1045137930748-mbe2osfvmmfdsjplditaa4issounob3a.apps.googleusercontent.com';

function LoginScreen({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    navigation.replace('Splash');
    return;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = userInfo.idToken;

      const response = await dispatch(fetchLogin(token)).unwrap();

      console.log('Response: ', response);

      if (response?.success === true) {
        navigation.replace('Splash');
      }
    } catch (error) {
      console.error('Error attempting to sign in: ', error);
    }
  };

  return (
    <LinearGradient
      colors={['#C1DCF2', '#3A7CA5', '#6C9BC1']}
      style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>Movie Play</Text>
        <Text style={styles.subtitle}>Inicia Sesion</Text>
        <Text style={styles.paragraph}>
          Inicia Sesion y divertite descubriendo nuevos trailers de peliculas y
          series
        </Text>
        <Pressable onPress={() => signIn()}>
          <Text style={styles.button}>Continuar con Google</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  title: {
    color: '#16425B',
    fontSize: 50,
    fontWeight: '800',
    marginBottom: 50,
  },
  logo: {
    marginTop: 100,
    marginBottom: 10,
    width: 235,
    height: 204,
  },
  subtitle: {
    color: '#0B3750',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'left',
    width: '300px',
  },
  paragraph: {
    color: '#0B3750',
    fontSize: 20,
    marginBottom: 50,
    textAlign: 'left',
    width: '300px',
  },
  button: {
    fontSize: 20,
    backgroundColor: '#6C9BC1',
    color: '#0B3750',
    borderWidth: 1,
    borderColor: '#0B3750',
    borderRadius: 14,
    paddingHorizontal: 40,
  },
});

export default LoginScreen;
