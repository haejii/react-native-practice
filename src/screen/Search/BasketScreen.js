import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
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
} from '../../actions';
import {ContentScreenStyle} from '../../style/styles';
import NuturitionBarChart from '../../moduleComponent/NuturitionBarChart';

export default function BasketFood() {
  const dispatch = useDispatch();
  const meal = useSelector((state) => state.meal);
  const count = useSelector((state) => state.foodCount);
  const basketFoods = useSelector((state) => state.basketFoods);
  const [mealTime, setMealTime] = useState('');
  const {goal} = useSelector((state) => state.user);

  const calorie = basketFoods.map((basketFood, index) => basketFood.calorie);
  let calorie2 = calorie.reduce((acc, curr) => acc + curr, 0);

  const protein = basketFoods.map((basketFood, index) => basketFood.protein);
  let protein2 = protein.reduce((acc, curr) => acc + curr, 0);

  const phosphorus = basketFoods.map(
    (basketFood, index) => basketFood.phosphorus,
  );
  let phosphorus2 = phosphorus.reduce((acc, curr) => acc + curr, 0);

  const potassium = basketFoods.map(
    (basketFood, index) => basketFood.potassium,
  );
  let potassium2 = potassium.reduce((acc, curr) => acc + curr, 0);

  const sodium = basketFoods.map((basketFood, index) => basketFood.sodium);
  let sodium2 = sodium.reduce((acc, curr) => acc + curr, 0);

  const handleOnpress = () => {
    const basketIds = basketFoods.map((basketFood, index) => basketFood.foodId);
    dispatch(postAddMeal(mealTime, basketIds));
    dispatch(changeCount(0));
    dispatch(resetBasket([]));
  };

  const hadlePressRemove = (value) => {
    dispatch(changeCount(count - 1));
    dispatch(removeBasket(value));
  };

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
            <View style={{flexDirection: 'row'}}>
              <Text style={{paddingVertical: 5}} key={index}>
                -{basketFood.foodName}
              </Text>
              <NativeButton
                style={ContentScreenStyle.removeBtn}
                textStyle={{color: 'white'}}
                onPress={() => hadlePressRemove(basketFood.foodId)}>
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
            열량 ({calorie2} kcal / {goal?.calorie} kcal)
          </Text>
          <NuturitionBarChart nuturition={calorie2} goal={goal?.calorie} />

          <Text>
            단백질 ({protein2} g/ {goal?.protein} g)
          </Text>
          <NuturitionBarChart nuturition={protein2} goal={goal?.protein} />

          <Text>
            인 ({phosphorus2} mg / {goal?.phosphorus} mg)
          </Text>
          <NuturitionBarChart
            nuturition={phosphorus2}
            goal={goal?.phosphorus}
          />

          <Text>
            칼륨 ({potassium2} mg / {goal?.potassium} mg)
          </Text>

          <NuturitionBarChart nuturition={potassium2} goal={goal?.potassium} />

          <Text>
            나트륨 ({sodium2} mg / {goal?.sodium} mg)
          </Text>
          <NuturitionBarChart nuturition={sodium2} goal={goal?.sodium} />
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
                handleOnpress();
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
