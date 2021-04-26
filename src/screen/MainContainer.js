import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import MyPageScreen from './MyPageScreen';
import RecipeScreen from './RecipeScreen';
import SearchScreen from './Search/SearchScreen';
import DietScreen from './Diet/DietScreen';
import HomeScreen from './HomeScreen';
import DialysisScreen from './Dialysis/DialysisScreen';
import {TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

export default function Main() {
  const kidneyType = useSelector((state) => state.user.kidneyType);
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
          } else if (route.name === '식단') {
            return (
              <Icon
                name={focused ? 'ios-book' : 'ios-book-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '내 정보') {
            return (
              <Icon
                name={
                  focused ? 'ios-person-circle' : 'ios-person-circle-outline'
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === '투석 일지') {
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
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      {kidneyType === 5 && (
        <Tab.Screen name="투석 일지" component={DialysisScreen} />
      )}
      <Tab.Screen name="검색" component={SearchScreen} />
      <Tab.Screen name="식단" component={DietScreen} />
      <Tab.Screen name="내 정보" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
