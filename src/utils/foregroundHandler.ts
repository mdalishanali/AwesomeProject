import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export const foregroundHandler = () => {
        const unsubscribe = messaging().onMessage(async romoteMessage => {
                const { messageId, notification } = romoteMessage;
                PushNotification.localNotification({
                        channelId: 'channelId',
                        messageId: messageId,
                        title: notification?.title,
                        message: notification?.body || 'New Message',
                        soundName: 'default',
                        vibrate: true,
                        playSound: true,
                })
        });
        return unsubscribe;
};
