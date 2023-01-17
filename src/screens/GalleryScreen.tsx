import {
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
import ProgressiveImage from '../components/ProgressiveImage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GalleryScreen({navigation}: any) {
  const {user, logout} = useContext(AuthContext);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPhotos();
  }, []);

  const getAllPhotos = async () => {
    try {
      const list: any = [];
      await firestore()
        .collection('photos')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc: any) => {
            if (doc.exists) {
              list.push(doc.data());
            }
          });
        });
      if (loading) {
        setLoading(false);
      }
      setImages(list);
    } catch (e) {
      setLoading(false);
    }
  };
  const openDetails = () => {
    navigation.navigate(routes.IMAGE_DETAILS);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          {images.length ? (
            <FlatList
              data={images}
              keyExtractor={item => item.postImg}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              style={{alignSelf: 'stretch'}}
              initialNumToRender={5}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      height: 305,
                      width: sizes.width / 2 - 20,
                      margin: 10,
                    }}
                    key={index}>
                    <Image
                      source={{uri: item.postImg}}
                      style={{
                        height: 300,
                        width: sizes.width / 2 - 20,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <Text>No Items exists</Text>
          )}
        </View>
      )}

      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Upload Photo"
          onPress={openDetails}>
          <Icon name="images" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  image: {
    width: sizes.width - 20,
    height: 220,
    marginBottom: 15,
  },
});
