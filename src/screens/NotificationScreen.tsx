import {StyleSheet, TouchableOpacity, Text, View, Button} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../navigation/AuthProvider';

export default function NotificationScreen() {
  const {logout} = useContext(AuthContext);

  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    fcmToken && setFcmToken(fcmToken);
  };

  const sendNotification = async () => {
    try {
      const FIREBASE_API_KEY =
        'AAAA1jCwSvE:APA91bHfmjWqCdeSuYtE7EGdMGIPoIwZjp5QqEEySzzQGv7fEecp_Cg_Uym_ezF00OugiZkVJKu7bm_4qDMyaU9Q-JGbK5jdiE2vFMSQ8YCRSKNR_uRfq7PAIGPvbDATenVvvmRWx8tH';

      const message = {
        to: fcmToken,
        notification: {
          messageId: 'messageId',
          title: 'Coders Never quit',
          body: 'Are you agree?',
        },
      };

      let headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `key=${FIREBASE_API_KEY}`,
      });
      let response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(message),
      });
      const data = await response.json();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <Button title="Send Notification" onPress={sendNotification} />
      </View>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', paddingHorizontal: 20},
});
