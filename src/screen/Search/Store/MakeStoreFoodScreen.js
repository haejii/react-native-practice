import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react/cjs/react.development';

import FoodController from '../../../controller/FoodController';
import {DietScreenStyle} from '../../../style/styles';
import NativeButton from 'apsl-react-native-button';
import FoodInformationModal from '../firstTab/FoodInformationModal';
import {postStoreFood, storeFood} from '../../../actions';
import NuturitionBarChart from '../../../moduleComponent/NuturitionBarChart';

export default function MakeStoreFood() {
  const dispatch = useDispatch();
  const storedFood = useSelector((state) => state.storedFood);
  const [basketName, setBasketName] = useState('');
  const {goal} = useSelector((state) => state.user);

  const handlePressAddFoodStore = () => {
    console.log('나만의 음식 추가 하기');
    if (!basketName) {
      Alert.alert('음식 추가 오류', '음식 이름을 입력해주세요!');
      return;
    }
    dispatch(postStoreFood(basketName, storedFood));
    setBasketName('');
  };

  const calorie = storedFood
    .map((storeFoods) => +storeFoods.calorie)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const protein = storedFood
    .map((storeFoods) => +storeFoods.protein)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const phosphorus = storedFood
    .map((storeFoods) => +storeFoods.phosphorus)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const potassium = storedFood
    .map((storeFoods) => +storeFoods.potassium)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const sodium = storedFood
    .map((storeFoods) => +storeFoods.sodium)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const handlePressRemove = () => {};

  return (
    <View style={{flex: 2}}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'black',
          // backgroundColor: 'pink',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>나의 메뉴 만들기</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={{flex: 3}}>
          <TextInput
            placeholder="저장할 장바구니 이름을 입력해주세요. "
            autoCapitalize="none"
            value={basketName}
            onChangeText={(value) => setBasketName(value)}
          />
        </View>
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>담긴음식</Text>
          </TouchableOpacity>
          <Text>{storeFood.foodId}</Text>
          {storedFood.map((basketFood, index) => (
            <View style={{flexDirection: 'row', flex: 1}} key={index}>
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>열량</Text>
          </TouchableOpacity>

          <View
            style={{
              margin: 10,
            }}>
            <Text>
              열량 ({+calorie} kcal / {goal?.calorie} kcal)
            </Text>
            <NuturitionBarChart nuturition={calorie} goal={goal?.calorie} />

            <Text>
              단백질 ({+protein} g/ {goal?.protein} g)
            </Text>
            <NuturitionBarChart nuturition={protein} goal={goal?.protein} />

            <Text>
              인 ({+phosphorus} mg / {goal?.phosphorus} mg)
            </Text>
            <NuturitionBarChart
              nuturition={phosphorus}
              goal={goal?.phosphorus}
            />

            <Text>
              칼륨 ({+potassium} mg / {goal?.potassium} mg)
            </Text>

            <NuturitionBarChart nuturition={potassium} goal={goal?.potassium} />

            <Text>
              나트륨 ({+sodium} mg / {goal?.sodium} mg)
            </Text>
            <NuturitionBarChart nuturition={sodium} goal={goal?.sodium} />
          </View>
        </View>
        <View>
          <NativeButton
            style={{
              margin: 10,
            }}
            onPress={() => {
              handlePressAddFoodStore();
            }}>
            추가하기
          </NativeButton>
        </View>
      </ScrollView>
    </View>
  );
}
