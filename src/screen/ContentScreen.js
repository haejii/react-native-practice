import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch, useSelector} from 'react-redux';
import NativeButton from 'apsl-react-native-button';
import {requestFoodRecord, requestRemoveFood} from '../actions';
import DietHeader from './Diet/DietHeader';
import DateTimePicker from '@react-native-community/datetimepicker';

const Tab = createMaterialTopTabNavigator();

function MyDiet() {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const meal = useSelector((state) => state.meal);
  const goal = useSelector((state) => state.user.goal);

  let today = `${year}년 ${month}월 ${day}일`;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
    setDay(currentDate.getDay());
    console.log(currentDate);
    console.log(currentDate.getFullYear());
    console.log(currentDate.getMonth() + 1);
    console.log(currentDate.getDay());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    dispatch(requestFoodRecord());
  }, []);

  return (
    <View>
      <View>
        <View>
          <Button
            style={{color: 'yellow'}}
            onPress={showDatepicker}
            title={today}
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
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
