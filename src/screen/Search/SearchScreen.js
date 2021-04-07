import React from 'react';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchScreen2 from './firstTab/SearchScreen2';
import StoreScreen from './StoreScreen';
import BasketScreen from './BasketScreen';

const Tab = createMaterialTopTabNavigator();

export default function SearchScreen() {
  const count = useSelector((state) => state.foodCount);
  let basketName = count === 0 ? '담기(0)' : `담기( ${count})`;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
        style: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen
        name="Search"
        component={SearchScreen2}
        options={{tabBarLabel: '검색'}}
      />
      <Tab.Screen
        name={basketName}
        component={BasketScreen}
        options={{tabBarLable: '담기'}}
      />
      <Tab.Screen
        name="StoredFood"
        component={StoreScreen}
        options={{tabBarLabel: '찜'}}
      />
    </Tab.Navigator>
  );
}
