import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountAvatar = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
      <Image
        source={{uri: props.picture}}
        style={styles.avatar}
      />
      <Ionicons
        name="camera"
        size={24}
        color="#262626"
        style={{marginLeft: -20, zIndex: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    marginTop: 40,
  },
});

export default AccountAvatar;
