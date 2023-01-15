import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Providers from './src/navigation';
import {foregroundHandler} from './src/utils/foregroundHandler';
import {
  notificationListener,
  requestUserPermission,
} from './src/utils/pushNotificationHelper';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    requestUserPermission();
    notificationListener();
    foregroundHandler();
  }, []);

  return <Providers />;
};

export default App;
