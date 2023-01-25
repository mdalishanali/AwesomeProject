import React, {useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {View, ActivityIndicator, Text} from 'react-native';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: any) => {
    console.log('user: 1111', user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber; // unsubscribe on unmount
    };
  }, []);

  if (initializing) {
    return null;
  }
  // if (initializing) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center'}}>
  //       <ActivityIndicator size="large" color="#00ff00" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
