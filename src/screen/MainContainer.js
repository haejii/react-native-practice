import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import MyPageScreen from './MyPageScreen';
import RecipeScreen from './RecipeScreen';
import SearchScreen from './SearchScreen';
import ContentScreen from './ContentScreen';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === '홈') {
            return (
              <Icon
                name={focused ? 'ios-home' : 'ios-home-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '커뮤니티') {
            return (
              <Icon
                name={focused ? 'ios-reader' : 'ios-reader-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '검색') {
            return (
              <Icon
                name={focused ? 'ios-search' : 'ios-search-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '컨텐츠') {
            return (
              <Icon
                name={focused ? 'ios-book' : 'ios-book-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '마이페이지') {
            return (
              <Icon
                name={
                  focused ? 'ios-person-circle' : 'ios-person-circle-outline'
                }
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'teal', // tomato
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="커뮤니티" component={RecipeScreen} />
      <Tab.Screen name="검색" component={SearchScreen} />
      <Tab.Screen name="컨텐츠" component={ContentScreen} />
      <Tab.Screen name="마이페이지" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
