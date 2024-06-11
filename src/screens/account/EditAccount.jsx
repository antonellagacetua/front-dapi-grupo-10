import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AccountAvatar from '../../components/AccountAvatar';
import { useRoute } from '@react-navigation/native';
import { store } from '../../redux/configureStore';
import apiClient from '../../api/apiClient';

function EditAccount({navigation}) {


  const token = store.getState().auth.session.jwt;

  const route = useRoute();
  const { id, given_name, name, nickname, email, picture } = route.params.user;

  const [profilePicture, setProfilePicture] = useState(picture);


  const [userParams, setUserParams] = useState({
    nameParam: name,
    pictureParam: null,
    nicknameParam: nickname,
  });

  const [errors, setErrors] = useState({
    nickname: '',
    name: '',
  });

  const handleSaveChanges = async ()  => {

    const { nameParam, nicknameParam, pictureParam } = userParams;

    const newErrors = {};

    if (!nicknameParam || nicknameParam.length < 3) {
      newErrors.nickname = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!nameParam || nameParam.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    const data = new FormData();

    if (nameParam !== name) {
      data.append('name', nameParam);
    }

    if (nicknameParam !== nickname) {
      data.append('nickname', nicknameParam);
    }

    if (pictureParam) {
      data.append('picture', {
        uri: pictureParam,
        type: 'image/jpeg',
        name: 'profile_picture.jpg',
      });
    }

    const updateUser = async () => {
      try {
        const response =  await apiClient.patch(`/user/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        navigation.navigate('Account');
      } catch (error) {
        console.log(error);
        console.error('API call error when trying to update user info: ', error.message);
      }
    }

    await updateUser();
  }

  const handleImageChange = (base64Image, uri) => {
    setProfilePicture(base64Image);
    setUserParams({...userParams, pictureParam: uri});
  };


  return (
    <View style={styles.container}>
      
      <AccountAvatar 
        picture={profilePicture} 
        enableEdit="true"
        onImageChange={handleImageChange}
      />

      <Text style={styles.username}>{given_name}</Text>

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
            value={userParams.nicknameParam}
            onChangeText={(text) => {setUserParams({...userParams, nicknameParam: text})}}
            maxLength={30}
          />
          <Text style={styles.error}>{errors.nickname}</Text>
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
            value={userParams.nameParam}
            onChangeText={(text) => {setUserParams({...userParams, nameParam: text})}}
            maxLength={30}
          />
          <Text style={styles.error}>{errors.name}</Text>
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
            value={email}
          />
        </View>
        <Pressable onPress={handleSaveChanges}>
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
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
    width: '100%',
  },
});

export default EditAccount;
