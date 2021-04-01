import React from 'react';
import {Text, View, TouchableOpacity, Button, Alert} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import FoodController from '../controller/FoodController';
import {convertMealTimeEnglishToKorean} from '../utils/convertData';
import NativeButton from 'apsl-react-native-button';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {ContentScreenStyle} from '../style/styles';

const Tab = createMaterialTopTabNavigator();

const hadlePressRemove = () => {
  Alert.alert('이 음식을 지우겠습니까?', '', [
    {
      text: '지우기',
      onPress: () => {},
    },
    {text: '취소'},
  ]);
};

function MyDiet() {
  const meal = useSelector((state) => state.meal);

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
        {Object.keys(meal).map((key, i) => (
          <View key={i}>
            <TouchableOpacity>
              <Collapse>
                <CollapseHeader
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
                </CollapseHeader>

                <CollapseBody>
                  <ScrollView
                    style={{paddingHorizontal: 10, paddingVertical: 5}}>
                    {FoodController.findFoodsByIds(meal[key]).map((food) => (
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{paddingVertical: 5}}>- {food.name}</Text>
                        <NativeButton
                          style={ContentScreenStyle.removeBtn}
                          textStyle={{color: 'white'}}
                          onPress={() => hadlePressRemove()}>
                          -
                        </NativeButton>
                      </View>
                    ))}
                  </ScrollView>
                </CollapseBody>
              </Collapse>
            </TouchableOpacity>
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
export default function ContentScreen2() {
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
