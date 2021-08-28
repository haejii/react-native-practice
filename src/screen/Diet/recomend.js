import React from 'react';
import {Text, View, ScrollView, Button} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react/cjs/react.development';
import {
  postAddMeal,
  removeRecommend,
  removeRecommendBasket,
  requestDiets,
  setFoodCategories,
} from '../../actions';
import NuturitionBarChart from '../../moduleComponent/NuturitionBarChart';
import {convertMealTimeEnglishToKorean} from '../../utils/convertData';
import {convertMealTime} from '../../utils/functions';

import {DietScreenStyle} from '../../style/styles';
import NativeButton from 'apsl-react-native-button';
import RecommendModal from './recommendModal';
import RecipeModal from './recipeModal';

export default function Recommend({btn, gender, kidneyType, nutrition}) {
  const dispatch = useDispatch();
  const dietMeal = useSelector((state) => state.diet);
  const goal = useSelector((state) => state.user.goal);
  let basket = [];

  const convertMealTime = {
    1: 'breakfast',
    2: 'lunch',
    3: 'dinner',
    4: 'snack',
  };

  let calorie = 0;
  let protein = 0;
  let phosphorus = 0;
  let potassium = 0;
  let sodium = 0;

  const handlePressAddMeal = () => {
    console.log(dietMeal[convertMealTime[btn]]);
    //dispatch(postAddMeal(btn, basket));
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      {dietMeal[convertMealTime[btn]]?.map((food, i) => {
        calorie += +food.calorie;
        protein += +food.protein;
        phosphorus += +food.phosphorus;
        potassium += +food.potassium;
        sodium += +food.sodium;
        basket = [...basket, food];
        return (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 230,
                borderWidth: 1,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderColor: 'black',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 5,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {food.foodName}
              </Text>
            </TouchableOpacity>
            <RecipeModal food={food} />
            <RecommendModal food={food} />
          </View>
        );
      })}
      <View style={{alignItems: 'center', marginTop: 20}}>
        <View
          style={{
            width: '90%',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'white',
            backgroundColor: 'pink',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>섭취 열량</Text>
        </View>
      </View>

      <View
        style={{
          margin: 10,
        }}>
        <Text>
          열량 ({calorie.toFixed(3)} kcal / {goal?.calorie} kcal)
        </Text>
        <NuturitionBarChart nuturition={calorie} goal={goal?.calorie} />

        <Text>
          단백질 ({protein.toFixed(3)} g/ {goal?.protein} g)
        </Text>
        <NuturitionBarChart nuturition={protein} goal={goal?.protein} />

        <Text>
          인 ({phosphorus.toFixed(3)} mg / {goal?.phosphorus} mg)
        </Text>
        <NuturitionBarChart nuturition={phosphorus} goal={goal?.phosphorus} />

        <Text>
          칼륨 ({potassium.toFixed(3)} mg / {goal?.potassium} mg)
        </Text>

        <NuturitionBarChart nuturition={potassium} goal={goal?.potassium} />

        <Text>
          나트륨 ({sodium.toFixed(3)} mg / {goal?.sodium} mg)
        </Text>
        <NuturitionBarChart nuturition={sodium} goal={goal?.sodium} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{marginRight: 3}}>
          <NativeButton
            style={{
              margin: 3,
              width: 100,
              height: 30,
              backgroundColor: 'white',
            }}>
            찜하기
          </NativeButton>
        </View>
        <View style={{marginRight: 3}}>
          <NativeButton
            style={{
              margin: 3,
              width: 100,
              height: 30,
              backgroundColor: 'white',
            }}
            onPress={() => {
              handlePressAddMeal();
            }}>
            식사로등록
          </NativeButton>
        </View>
      </View>
    </View>
  );
}
