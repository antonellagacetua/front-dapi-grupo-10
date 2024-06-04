import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AccountAvatar from '../../components/AccountAvatar';

function EditAccount({navigation}) {
  return (
    <View style={styles.container}>
      <AccountAvatar />

      <Text style={styles.username}>Antogace</Text>

      <View style={{width: '100%'}}>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: '#262626',
              marginBottom: 5,
              width: '100%',
            }}>
            Nickname
          </Text>
          <TextInput
            style={{
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 5,
              width: '100%',
            }}
            value="antogace"
          />
          <View style={{marginVertical: 10}}></View>
          <Text
            style={{
              fontSize: 14,
              color: '#262626',
              marginBottom: 5,
              width: '100%',
            }}>
            Nombre completo
          </Text>
          <TextInput
            style={{
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 5,
              width: '100%',
            }}
            value="Antonella Gacetua"
          />
          <View style={{marginVertical: 10}}></View>
          <Text
            style={{
              fontSize: 14,
              color: '#262626',
              marginBottom: 5,
              width: '100%',
            }}>
            Email
          </Text>
          <TextInput
            style={{
              backgroundColor: '#D1D3D9',
              padding: 10,
              borderRadius: 5,
              width: '100%',
              borderColor: '#8F8E94',
              borderWidth: 1,
            }}
            value="antonellagacetua@gmail.com"
          />
        </View>
        <Pressable>
          <Text
            style={{
              color: '#fff',
              marginTop: 20,
              fontSize: 20,
              backgroundColor: '#0B3750',
              paddingHorizontal: 50,
              paddingVertical: 16,
              textAlign: 'center',
            }}>
            Guardar cambios
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#C1DCF2',
    paddingHorizontal: 30,
  },
  username: {
    fontSize: 22,
    color: '#262626',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonsView: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    color: '#262626',
    marginBottom: 10,
    borderRadius: 10,
    gap: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
});

export default EditAccount;
