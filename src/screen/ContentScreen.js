import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Button} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import FoodController from '../controller/FoodController';
import {convertMealTimeEnglishToKorean} from '../utils/convertData';
import {requestFoodRecord} from '../actions';

const Tab = createMaterialTopTabNavigator();

function MyDiet() {
  const dispatch = useDispatch();

  const meal = useSelector((state) => state.meal);

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

      <View>
        {Object.keys(meal).map((key, mealIdx) => (
          <View key={mealIdx}>
            <TouchableOpacity>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: 'white',
                  backgroundColor: 'skyblue',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {convertMealTimeEnglishToKorean(key)}
                </Text>
              </View>
            </TouchableOpacity>
            <ScrollView style={{paddingHorizontal: 10, paddingVertical: 5}}>
              {meal[key].map((food, foodIdx) => (
                <View style={{flexDirection: 'row'}} key={foodIdx}>
                  <Text style={{paddingVertical: 5}}>- {food.foodName}</Text>
                  <TouchableOpacity
                    style={{
                      borderWidth: 0.5,
                      backgroundColor: 'red',
                      borderRadius: 15,
                      borderColor: 'white',
                      width: 25,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                      left: 10,
                    }}
                    onPress={() => console.log('abcdef')}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      −
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </View>
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
