import {View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const BackButtonHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={{marginLeft: 10}}>
      <FontAwesome.Button
        name="long-arrow-left"
        size={30}
        backgroundColor="#f9fafd"
        color="#333"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default BackButtonHeader;
