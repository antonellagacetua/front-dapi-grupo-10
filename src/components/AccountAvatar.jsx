import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

const AccountAvatar = (props) => {

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' , includeBase64: true}, (response) => {
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
      }
    });
  };
  
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
        <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
        <Ionicons
          name="camera"
          size={24}
          color="#262626"
          style={{marginLeft: -20, zIndex: 1}}
        />
        </TouchableOpacity>
      )}
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
});

export default AccountAvatar;
