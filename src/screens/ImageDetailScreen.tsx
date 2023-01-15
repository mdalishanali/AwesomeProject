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
} from 'react-native';
import React, {useContext, useState} from 'react';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {sizes} from '../constants/theme';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import routes from '../constants/routes';

export default function ImageDetailScreen({navigation}: any) {
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: false,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      imageUri && setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: false,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      imageUri && setImage(imageUri);
    });
  };

  const submitImage = async () => {
    const imageUrl = await uploadImage();
    firestore()
      .collection('photos')
      .add({
        userId: user.uid,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        Alert.alert(
          'Post published!',
          'Your post has been published Successfully!',
        );
        navigation.navigate(routes.GALLERY);
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    try {
      const uploadUri = image;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;
      setUploading(true);
      setTransferred(0);
      const storageRef = storage().ref(`photos/${filename}`);
      const task = storageRef.putFile(uploadUri);
      task.on('state_changed', taskSnapshot => {
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      setImage('');
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  return (
    <ScrollView>
      <View style={{marginVertical: 20}}>
        <Button
          title="Take Photo From Camera"
          onPress={takePhotoFromCamera}
          color="#ff5c5c"
        />
      </View>
      <View style={{marginBottom: 20}}>
        <Button
          title="Choose Photo FromLibrary"
          onPress={choosePhotoFromLibrary}
        />
      </View>
      {uploading ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>{transferred} % Completed!</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
      {image ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: image}}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={submitImage}
            disabled={uploading}
            style={{
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#eff70a13',
              borderRadius: 5,
              paddingVertical: 15,
              paddingHorizontal: 45,
            }}>
            <Text style={{fontSize: 25}}>Upload Image</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: sizes.width,
    height: sizes.height - 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  image: {
    width: sizes.width - 50,
    height: sizes.height - 300,
  },
});
