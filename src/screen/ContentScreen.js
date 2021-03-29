import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function Myfood() {
  const [date, setDate] = useState('2021-03-29');
  const [morning, setMorning] = useState('두부전');
  return (
    <View
      style={{
        flex: 1,
        margin: 20,
      }}>
      <View>
        <Text style={{fontSize: 30}}>{date}</Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 20}}>아침</Text>
        <Text>{morning}</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 20}}>점심</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 20}}>저녁</Text>
      </View>
    </View>
  );
}

function recommemdFood() {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 4,
          margin: 20,
          fontSize: 30,
        }}>
        <Text style={{fontSize: 30}}>추천식단</Text>
        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 20}}>아침</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20}}>점심</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20}}>저녁</Text>
        </View>
      </View>

      <View
        style={{
          flex: 4,
          margin: 20,
          fontSize: 30,
        }}>
        <Text style={{fontSize: 30}}>추천간식</Text>
        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 20}}>재료</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20}}>레시피</Text>
        </View>
      </View>
    </View>
  );
}
export default function ContentScreen() {
  return (
    <Tab.Navigator
      initialRouteName="내 식단"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
        style: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen name="내 식단" component={Myfood} />
      <Tab.Screen name="추천식단" component={recommemdFood} />
    </Tab.Navigator>
  );
}
