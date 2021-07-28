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
import kidneyTypes from '../utils/kidneyType';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import DietScreen2 from './Diet/DietScreen2';

import home from '../../assets/image/home.png';
import home_at from '../../assets/image/home_at.png';
import memo from '../../assets/image/memo.png';
import memo_at from '../../assets/image/memo_at.png';
import my from '../../assets/image/my.png';
import my_at from '../../assets/image/my_at.png';
import recipe from '../../assets/image/recipe.png';
import recipe_at from '../../assets/image/recipe_at.png';
import search from '../../assets/image/search.png';
import search_at from '../../assets/image/search_at.png';
import HomeScreen2 from './HomeScreen2';

const Tab = createBottomTabNavigator();

export default function Main() {
  const kidneyType = useSelector((state) => state.user.kidneyType);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === '홈') {
            return <FontAwesomeIcon icon={faHome} size="30" />;
          } else if (route.name === '커뮤니티') {
            return (
              <FontAwesomeIcon icon={faHome} size="30" />
            );
          } else if (route.name === '검색') {
            return (
              <FontAwesomeIcon icon={faHome} size="30" />
            );
          } else if (route.name === '식단') {
            return (
              <FontAwesomeIcon icon={faHome} size="30" />
            );
          } else if (route.name === '내 정보') {
            return <FontAwesomeIcon icon={faUserCircle} size="30" />;
          } else if (route.name === '투석 일지') {
            return (
              <FontAwesomeIcon icon={faHome} size="30" />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black', // tomato
        inactiveTintColor: 'black',
        style: {
          backgroundColor: '#127185',
        },
      }}>
      <Tab.Screen
        name="홈"
        component={HomeScreen2}
        options={{headerShown: false}}
      />
      {(kidneyTypes[kidneyType] === '복막투석' ||
        kidneyTypes[kidneyType] === '혈액투석') && (
        <Tab.Screen name="투석 일지" component={DialysisScreen} />
      )}
      <Tab.Screen name="검색" component={SearchScreen} />
      <Tab.Screen name="식단" component={DietScreen} />
      <Tab.Screen name="내 정보" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
