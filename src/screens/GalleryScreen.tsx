import {Platform, StyleSheet, Text, View, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {sizes} from '../constants/theme';

export default function GalleryScreen() {
  const [image, setImage] = useState<any>(null);
  const [post, setPost] = useState('');

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: false,
    }).then(image => {
      console.log('image', image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
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
      setImage(imageUri);
    });
  };

  return (
    <View style={styles.container}>
      <Text>GalleryScreen</Text>
      <TextInput
        placeholder="What's on your mind?"
        multiline
        numberOfLines={4}
        // value={post}
        // onChangeText={content => setPost(content)}
      />
      {image ? <Image style={styles.image} source={{uri: image}} /> : null}
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
    marginBottom: 15
  },
});
