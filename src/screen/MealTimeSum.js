import React from 'react';
import {View, Text} from 'react-native';

export default function MealTimeSum({sum}) {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20}}>
        칼로리: {parseFloat(sum.calorie).toFixed(2)} kcal
      </Text>
      <Text style={{fontSize: 20}}>
        탄수화물: {parseFloat(sum.carbohydrate).toFixed(2)} g
      </Text>
      <Text style={{fontSize: 20}}>
        단백질: {parseFloat(sum.protein).toFixed(2)} g
      </Text>
      <Text style={{fontSize: 20}}>
        지방: {parseFloat(sum.fat).toFixed(2)} g
      </Text>
      <Text style={{fontSize: 20}}>
        나트륨: {parseFloat(sum.sodium).toFixed(2)} mg
      </Text>
      <Text style={{fontSize: 20}}>
        칼슘: {parseFloat(sum.calcium).toFixed(2)} mg
      </Text>
      <Text style={{fontSize: 20}}>
        칼륨: {parseFloat(sum.potassium).toFixed(2)} mg
      </Text>
      <Text style={{fontSize: 20}}>
        철: {parseFloat(sum.iron).toFixed(2)} mg
      </Text>
      <Text style={{fontSize: 20}}>
        인: {parseFloat(sum.phosphorus).toFixed(2)} mg
      </Text>
    </View>
  );
}
