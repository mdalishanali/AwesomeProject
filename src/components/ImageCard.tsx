import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {sizes} from '../constants/theme';

const ImageCard = ({item}: any) => {
  const {postImg} = item;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const imageDetails = () => {
    //     navigation.navigate('Details', {item});
  };

  return (
    <View
      style={{
        borderColor: 'black',
        borderRadius: 5,
        paddingBottom: 2,
        opacity: 1,
        marginHorizontal: 8,
        marginVertical: 15,
        flex: 1,
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={() => imageDetails()}>
        <Image source={{uri: postImg}} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({});
