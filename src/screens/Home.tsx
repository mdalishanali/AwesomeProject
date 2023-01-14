import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

export default function Home() {
  const {user, logout} = useContext(AuthContext);
  return (
    <View>
      <Text>{user.uid}</Text>
      <Text>{user.email}</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({});
