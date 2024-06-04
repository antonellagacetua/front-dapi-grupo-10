import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountAvatar from '../components/AccountAvatar';

function AccountScreen({navigation}) {
  return (
    <View style={styles.container}>
      <AccountAvatar />

      <Text style={styles.username}>Antogace</Text>

      <View style={styles.buttonsView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditAccount')}>
          <View style={styles.button}>
            <View style={styles.buttonsContainer}>
              <Ionicons
                name="arrow-redo-circle-outline"
                size={24}
                color="#262626"
              />
              <Text>Editar cuenta</Text>
            </View>
            <Ionicons name="add-circle-outline" size={24} color="#262626" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.button}>
            <View style={styles.buttonsContainer}>
              <Ionicons name="language" size={24} color="#262626" />
              <Text>Lenguaje</Text>
            </View>
            <Text>Espanol</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              'Cerrar sesion',
              '¿Estas seguro de que deseas cerrar tu sesion?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Confirmar',
                  style: 'destructive',
                  onPress: () => {
                    // TODO: Delete account
                    navigation.replace('Close', {action: 'close'});
                  },
                },
              ],
            );
          }}>
          <View style={styles.button}>
            <View style={styles.buttonsContainer}>
              <Ionicons name="exit-outline" size={24} color="#262626" />
              <Text>Cerrar sesion</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              'Eliminar cuenta',
              '¿Estas seguro de deseas eliminar tu cuenta?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Confirmar',
                  style: 'destructive',
                  onPress: () => {
                    // TODO: Delete account
                    navigation.navigate('Close', {action: 'delete'});
                  },
                },
              ],
            );
          }}>
          <View style={styles.button}>
            <View style={styles.buttonsContainer}>
              <Ionicons name="trash-outline" size={24} color="#262626" />
              <Text style={{color: 'red'}}>Eliminar cuenta</Text>
            </View>
          </View>
        </TouchableOpacity>
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

export default AccountScreen;
