import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import ActionButton from 'react-native-action-button';
import {sizes} from '../constants/theme';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import routes from '../constants/routes';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function GalleryScreen({navigation}: any) {
  const {user, logout} = useContext(AuthContext);
  const [images, setImages] = useState<any>(['a']);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    getAllPhotos();
  }, []);
  const getAllPhotos = async () => {
    try {
      const list: any = [];
      console.log('alisahn called once');
      await firestore()
        .collection('photos')
        .where('userId', '==', user.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          console.log('querySnapshot: ', querySnapshot);
          querySnapshot.forEach((doc: any) => {
            if (doc.exists) {
              console.log('doc.data: ', doc.data());
              list.push(doc.data());
            }
          });
        });
      // if (loading) {
      //   setLoading(false);
      // }
      console.log('list:**** ', list);
      setImages(list);
    } catch (e) {
      // setLoading(false);
    }
  };

  const openDetails = () => {
    navigation.navigate(routes.IMAGE_DETAILS);
  };
  return (
    <View>
      <Button title="Upload Photo" onPress={openDetails} />

      {false ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <FlatList
            data={images}
            renderItem={({item}) => (
              // <PostCard
              //   item={item}
              //   onPress={() =>
              //     navigation.navigate('HomeProfile', {userId: item.userId})
              //   }
              // />
              <View>
                <Text>alosa</Text>
              </View>
            )}
            // keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      <ActionButton buttonColor="#2e64e5">
        {/* <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item> */}
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // actionButtonIcon: {
  //   fontSize: 20,
  //   height: 22,
  //   color: 'white',
  // },
  // image: {
  //   width: sizes.width - 20,
  //   height: 220,
  //   marginBottom: 15,
  // },
});
