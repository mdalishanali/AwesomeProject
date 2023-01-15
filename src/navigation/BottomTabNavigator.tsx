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
  ImageDetailScreen,
} from '../screens/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const GalleryStack = ({navigation}: any) => (
  <Stack.Navigator>
    <Stack.Screen name={Routes.GALLERY} component={GalleryScreen} />
    <Stack.Screen
      name={Routes.IMAGE_DETAILS}
      component={ImageDetailScreen}
      options={({route}) => ({
        title: 'Details',
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);
export default function BottomTabNavigator() {
  const navigation = useNavigation();

  const getTabBarVisibility = (route: any) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
    if (routeName === routes.IMAGE_DETAILS) {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      initialRouteName={Routes.GALLERY_STACK}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          let routeName = route.name;
          if (routeName === Routes.NOTIFICATION) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (routeName === Routes.GALLERY_STACK) {
            iconName = focused ? 'images' : 'images-outline';
          } else if (routeName === Routes.NOTE) {
            iconName = focused
              ? 'chatbox-ellipses'
              : 'chatbox-ellipses-outline';
          } else if (routeName === Routes.CALCULATOR) {
            iconName = focused ? 'calculator' : 'calculator-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}>
      <Tab.Screen name={Routes.NOTIFICATION} component={NotificationScreen} />
      <Tab.Screen
        name={Routes.GALLERY_STACK}
        component={GalleryStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Gallery',
        })}
      />
      <Tab.Screen name={Routes.NOTE} component={NoteScreen} />
      <Tab.Screen name={Routes.CALCULATOR} component={CalculatorScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
