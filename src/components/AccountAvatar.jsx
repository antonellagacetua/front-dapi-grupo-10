import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Modal, Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import PermissionsAndroid from 'react-native/Libraries/PermissionsAndroid/PermissionsAndroid';

const AccountAvatar = (props) => {

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleLaunchCamera = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 1,
      saveToPhotos: true,
      includeBase64: true,
    };

    launchCamera(options, handleImageChange);
  };

  const handleLaunchImageLibrary = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, handleImageChange);
  };

  const handleImageChange = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.error('ImagePicker Error: ', response.error);
    } else {
      const uri = response.assets[0].uri;
      const base64Image = response.assets[0].base64;

      if (props.onImageChange) {
        props.onImageChange(base64Image, uri);
      }

      setModalVisible(false);
    }
  }

  const requestPermission = async () => {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
  }



  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
      <Image
        source={{uri: `data:image/jpeg;base64,${props.picture}`}}
        style={styles.avatar}
      />
      {props.enableEdit === "true" && (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconContainer}>
          <Ionicons
            name="camera"
            size={24}
            color="#262626"
            style={{ marginLeft: -20, zIndex: 1 }}
          />
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.buttonsView}>
            <View style={styles.buttonsContainer}>
              <Pressable onPress={handleLaunchCamera}>
                <Text style={styles.button}>Cámara</Text>
              </Pressable>
              <Pressable onPress={handleLaunchImageLibrary}>
                <Text style={styles.button}>Galería</Text>
              </Pressable>      
            </View>
            <View>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.button}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 120,
    height: 120,
    marginTop: 40,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
  },
  iconContainer: {
    marginLeft: -20,
    zIndex: 1,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonsView: {
    width: '80%',
    backgroundColor: '#C1DCF2',
    padding: 20,
    color: '#262626',
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    color: '#fff',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
    backgroundColor: '#0B3750',
    paddingHorizontal: 30,
    paddingVertical: 16,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});

export default AccountAvatar;