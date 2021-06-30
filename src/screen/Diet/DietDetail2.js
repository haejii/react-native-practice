import React from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import NativeButton from 'apsl-react-native-button';
import {useDispatch} from 'react-redux';
import {requestRemoveFood} from '../../actions';
import {DietScreenStyle} from '../../style/styles';

export default function DietDetail({foods, date}) {
  const dispatch = useDispatch();

  const handlePressRemove = (foodIntakeRecordTypeId, foodId) => {
    Alert.alert('이 음식을 지우겠습니까?', '', [
      {
        text: '지우기',
        onPress: () => {
          dispatch(requestRemoveFood(foodIntakeRecordTypeId, foodId, date));
        },
      },
      {text: '취소'},
    ]);
  };

  return (
    <ScrollView style={{paddingHorizontal: 10, paddingVertical: 5}}>
      {foods.map((food, idx) => (
        <View style={{flexDirection: 'row'}} key={idx}>
          <Text style={{paddingVertical: 5}}>- {food.foodName}</Text>
          <NativeButton
            style={DietScreenStyle.removeBtn}
            textStyle={{color: 'white'}}
            onPress={() =>
              handlePressRemove(food.foodIntakeRecordTypeId, food.foodId)
            }>
            -
          </NativeButton>
        </View>
      ))}
    </ScrollView>
  );
}
