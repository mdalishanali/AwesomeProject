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
import React, {useState, useContext} from 'react';
import {useRoute} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {AuthContext} from '../navigation/AuthProvider';
import {sizes} from '../constants/theme';

export default function ImageViewEdit() {
  const route: any = useRoute();
  // const item = route.params.item;
  // const {img, id} = item;

  const [image, setImage] = useState<string>('');
  const {user, logout} = useContext(AuthContext);
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
  const submitImage = () => {};

  return (
    <ScrollView>
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

      <View>
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
      </View>
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
