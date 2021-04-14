import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch, useSelector} from 'react-redux';
import NativeButton from 'apsl-react-native-button';
import {requestFoodRecord, requestRemoveFood} from '../actions';
import DietHeader from './Diet/DietHeader';

const Tab = createMaterialTopTabNavigator();

function MyDiet() {
  const dispatch = useDispatch();

  const meal = useSelector((state) => state.meal);
  const goal = useSelector((state) => state.user.goal);

  useEffect(() => {
    dispatch(requestFoodRecord());
  }, []);

  return (
    <View>
      <View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'white',
            backgroundColor: 'pink',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {new Date().getFullYear()}년 {new Date().getMonth() + 1}월{' '}
            {new Date().getDate()}일
          </Text>
        </TouchableOpacity>
      </View>

      <NativeButton
        style={{
          margin: 10,
        }}
        onPress={() => {
          // handlerequest();
        }}>
        추가하기
      </NativeButton>

      <DietHeader meal={meal} goal={goal} />
    </View>
  );
}

function RecommendDiet() {
  return (
    <View>
      <Text />
    </View>
  );
}

export default function ContentScreen() {
  return (
    <Tab.Navigator
      initialRouteName="MyDiet"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
        style: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen
        name="MyDiet"
        component={MyDiet}
        options={{tabBarLabel: '내 식단'}}
      />
      <Tab.Screen
        name="RecommendDiet"
        component={RecommendDiet}
        options={{tabBarLabel: '추천식단'}}
      />
    </Tab.Navigator>
  );
}
