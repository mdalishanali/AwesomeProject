import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Providers from './src/navigation';
import {notificationListener, requestUserPermission} from './src/utils/pushNotificationHelper';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    requestUserPermission();
    notificationListener();
  }, []);

  return <Providers />;
};

export default App;
