import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import NativeButton from 'apsl-react-native-button';

import {pickerItems} from '../../../assets/data/pickerData';

import RNPickerSelect from 'react-native-picker-select';
import {
  changeCount,
  postAddMeal,
  removeBasket,
  resetBasket,
  setError,
} from '../../actions';
import {DietScreenStyle} from '../../style/styles';
import NuturitionBarChart from '../../moduleComponent/NuturitionBarChart';
import errors from '../../utils/errors';

export default function BasketFood() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.foodCount);
  const basketFoods = useSelector((state) => state.basketFoods);
  const error = useSelector((state) => state.error);

  const [mealTime, setMealTime] = useState('');
  const {goal} = useSelector((state) => state.user);
  const err = useSelector((state) => state.error.status);

  const calorie = basketFoods
    .map((basketFood) => basketFood.calorie)
    .reduce((acc, curr) => acc + curr, 0);

  const protein = basketFoods
    .map((basketFood) => basketFood.protein)
    .reduce((acc, curr) => acc + curr, 0);

  const phosphorus = basketFoods
    .map((basketFood) => basketFood.phosphorus)
    .reduce((acc, curr) => acc + curr, 0);

  const potassium = basketFoods
    .map((basketFood) => basketFood.potassium)
    .reduce((acc, curr) => acc + curr, 0);

  const sodium = basketFoods
    .map((basketFood) => basketFood.sodium)
    .reduce((acc, curr) => acc + curr, 0);

  const handlePressAddMeal = () => {
    if (!mealTime) {
      Alert.alert('식단 추가 오류', '식사 시기를 선택해주세요!');
      return;
    }
    dispatch(postAddMeal(mealTime, basketFoods));
  };

  const handlePressRemove = (value) => {
    dispatch(changeCount(count - 1));
    dispatch(removeBasket(value));
  };

  useEffect(() => {
    if (
      error.status &&
      (error.name === errors.ADD_MEAL_FAILED ||
        error.name === errors.ADD_MEAL_ERROR)
    ) {
      Alert.alert('식단 추가에 실패하였습니다.', '잠시 후 다시 시도해주세요');
      dispatch(setError());
    }
  }, [error, dispatch]);

  return (
    <View>
      <ScrollView>
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>나의 메뉴</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            margin: 10,
          }}>
          {basketFoods.map((basketFood, index) => (
            <View style={{flexDirection: 'row'}} key={index}>
              <Text style={{paddingVertical: 5}}>-{basketFood.foodName}</Text>
              <NativeButton
                style={DietScreenStyle.removeBtn}
                textStyle={{color: 'white'}}
                onPress={() => handlePressRemove(basketFood.foodId)}>
                -
              </NativeButton>
            </View>
          ))}
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'white',
            backgroundColor: 'pink',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>남은 열량</Text>
        </View>
        <View
          style={{
            margin: 10,
          }}>
          <Text>
            열량 ({calorie} kcal / {goal?.calorie} kcal)
          </Text>
          <NuturitionBarChart nuturition={calorie} goal={goal?.calorie} />

          <Text>
            단백질 ({protein} g/ {goal?.protein} g)
          </Text>
          <NuturitionBarChart nuturition={protein} goal={goal?.protein} />

          <Text>
            인 ({phosphorus} mg / {goal?.phosphorus} mg)
          </Text>
          <NuturitionBarChart nuturition={phosphorus} goal={goal?.phosphorus} />

          <Text>
            칼륨 ({potassium} mg / {goal?.potassium} mg)
          </Text>

          <NuturitionBarChart nuturition={potassium} goal={goal?.potassium} />

          <Text>
            나트륨 ({sodium} mg / {goal?.sodium} mg)
          </Text>
          <NuturitionBarChart nuturition={sodium} goal={goal?.sodium} />
        </View>

        <View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'white',
              backgroundColor: 'pink',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 17,
              }}>
              식사시기
            </Text>
          </View>
          <RNPickerSelect
            onValueChange={(value) => {
              setMealTime(value);
            }}
            placeholder={pickerItems.MealTypes.placeholder({
              value: null,
            })}
            value={mealTime}
            items={pickerItems.MealTypes.items}
            style={pickerSelectStyles}
          />
          <View>
            <NativeButton
              style={{
                margin: 10,
              }}
              onPress={() => {
                console.log('추가하기 버튼 클릭됨');
                handlePressAddMeal();
              }}>
              추가하기
            </NativeButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '80%',
    fontSize: 18,
    fontWeight: '800',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 30,
  },
});
