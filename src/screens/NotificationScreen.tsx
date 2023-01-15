import {StyleSheet, TouchableOpacity, Text, View, Button} from 'react-native';
import React from 'react';

export default function NotificationScreen() {
  const sendNotification = async () => {
    try {
      const FIREBASE_API_KEY =
        'AAAA1jCwSvE:APA91bHfmjWqCdeSuYtE7EGdMGIPoIwZjp5QqEEySzzQGv7fEecp_Cg_Uym_ezF00OugiZkVJKu7bm_4qDMyaU9Q-JGbK5jdiE2vFMSQ8YCRSKNR_uRfq7PAIGPvbDATenVvvmRWx8tH';

      const message = {
        to: 'fX7Tt2BEQNSs5XGYfKqNgV:APA91bHixEOKBQ5WdUncwzPGlDh1CmbHCzYxVaGCDzUcT4jaPLUjEZ4UceIvk0ibC3dBUpx5gkqkzF9kAGSyLEJ3AHd1jUfazMaErb1wxngO5hRpJ9IxqR553b9cQY0JU4HZ8Vp7FM0D',
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
      <Button title="Send Notification" onPress={sendNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', paddingHorizontal: 20},
});
