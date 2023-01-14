import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// //Screen names
// const homeName = 'Home';
// const detailsName = 'Details';
// const settingsName = 'Settings';
import Routes from '../constants/routes';
//all screen
import {
  NotificationScreen,
  GalleryScreen,
  NoteScreen,
  CalculatorScreen,
} from '../screens/index';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName={Routes.NOTIFICATION}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          let routeName = route.name;
          if (routeName === Routes.NOTIFICATION) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (routeName === Routes.GALLERY) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (routeName === Routes.NOTE) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (routeName === Routes.CALCULATOR) {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}>
      <Tab.Screen name={Routes.NOTIFICATION} component={NotificationScreen} />
      <Tab.Screen name={Routes.GALLERY} component={GalleryScreen} />
      <Tab.Screen name={Routes.NOTE} component={NoteScreen} />
      <Tab.Screen name={Routes.CALCULATOR} component={CalculatorScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});