import React, {useState, useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MovieRating = ({handleRate, handleClose}) => {
  const [rating, setRating] = useState(0);
  const votes = useRef(Math.ceil(Math.random() * 999)).current;

  const handleStarPress = rate => {
    setRating(rate);
  };

  return (
    <View
      style={{
        height: 300,
        width: '100%',
        backgroundColor: '#3A7CA5',
        borderRadius: 10,
      }}>
      <Pressable
        style={{position: 'absolute', top: 4, right: 4}}
        onPress={handleClose}>
        <Ionicons name="close" size={30} color="black" />
      </Pressable>
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 40,
        }}>
        Que te parecio esta pelicula?
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          textAlign: 'center',
          marginTop: 20,
        }}>
        {votes} personas la puntuaron!
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
          gap: 10,
        }}>
        <Pressable onPress={() => handleStarPress(2)}>
          <Ionicons
            name="star"
            size={50}
            color={rating >= 2 ? 'yellow' : 'white'}
          />
        </Pressable>
        <Pressable onPress={() => handleStarPress(4)}>
          <Ionicons
            name="star"
            size={50}
            color={rating >= 4 ? 'yellow' : 'white'}
          />
        </Pressable>
        <Pressable onPress={() => handleStarPress(6)}>
          <Ionicons
            name="star"
            size={50}
            color={rating >= 6 ? 'yellow' : 'white'}
          />
        </Pressable>
        <Pressable onPress={() => handleStarPress(8)}>
          <Ionicons
            name="star"
            size={50}
            color={rating >= 8 ? 'yellow' : 'white'}
          />
        </Pressable>
        <Pressable onPress={() => handleStarPress(10)}>
          <Ionicons
            name="star"
            size={50}
            color={rating >= 10 ? 'yellow' : 'white'}
          />
        </Pressable>
      </View>
      <View
        style={{
          display: 'flex',
          width: '100%',
          paddingHorizontal: 50,
        }}>
        <Pressable
          style={{
            backgroundColor: '#0B3750',
            padding: 20,
            alignItems: 'center',
          }}
          onPress={() => handleRate(rating)}>
          <Text style={{color: 'white', fontSize: 18}}>Puntuar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MovieRating;
