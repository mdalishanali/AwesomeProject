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
} from 'react-native';
import React, {useContext, useState} from 'react';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {sizes} from '../constants/theme';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

export default function GalleryScreen() {
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [title, setTitle] = useState<string>('');

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: false,
    }).then(image => {
      console.log('image', image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      imageUri && setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
      compressImageMaxHeight: 300,
      compressImageMaxWidth: 300,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      imageUri && setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    firestore()
      .collection('photos')
      .add({
        userId: user.uid,
        title: title,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log('Post Added!');
        Alert.alert(
          'Post published!',
          'Your post has been published Successfully!',
        );
        setTitle('');
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
      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <Text>GalleryScreen</Text>
      <TextInput
        placeholder="What's on your mind?"
        multiline
        numberOfLines={4}
        value={title}
        onChangeText={content => setTitle(content)}
      />
      {image ? <Image style={styles.image} source={{uri: image}} /> : null}
      {uploading ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>{transferred} % Completed!</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={submitPost}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#2e64e515',
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 25,
          }}>
          <Text>Post</Text>
        </TouchableOpacity>
      )}
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
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
