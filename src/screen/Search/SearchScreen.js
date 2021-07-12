import React from 'react';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Search from './firstTab/Search';
import StoreScreen from './Store/StoreScreen';
import BasketScreen from './BasketScreen';

const Tab = createMaterialTopTabNavigator();

export default function SearchScreen() {
  const count = useSelector((state) => state.foodCount);
  let basketName = count === 0 ? '담기(0)' : `담기( ${count} )`;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
        style: {backgroundColor: 'white', height: 60},
      }}>
      <Tab.Screen
        name="Search"
        component={Search}
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
