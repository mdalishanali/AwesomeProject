import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
                console.log('Authorization status:', authStatus);
                getFCMToken();
        }
}

async function getFCMToken() {
        let fcmToken = await AsyncStorage.getItem('fcmtoken');
        console.log('fcmToken: old token ', fcmToken);
        if (!fcmToken) {
                try {
                        let fcmToken = await messaging().getToken();
                        if (fcmToken) {
                                await AsyncStorage.setItem('fcmToken', fcmToken);
                                console.log('newtoken: ', fcmToken);
                        }
                } catch (error) {
                        console.log('error: ', error);

                }
        }
}

export const notificationListener = () => {
        messaging().onNotificationOpenedApp(remoteMessage => {
                console.log(
                        'Notification caused app to open from background state:',
                        remoteMessage.notification,
                );
                // navigation.navigate(remoteMessage.data.type);
        });

        // Check whether an initial notification is available
        messaging()
                .getInitialNotification()
                .then(remoteMessage => {
                        if (remoteMessage) {
                                console.log(
                                        'Notification caused app to open from quit state:',
                                        remoteMessage.notification,
                                );
                        }
                });

        messaging().onMessage(async romoteMessage => {
                console.log("notificatinon on foreground state...", romoteMessage);
        })
}