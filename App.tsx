import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Providers from './src/navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Providers />;
};

export default App;
