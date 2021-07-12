import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import NuturitionBarChart from '../../moduleComponent/NuturitionBarChart';
import {FoodInformationModalStyles, DietModalStyles} from '../../style/styles';
import {useDispatch} from 'react-redux';
import {requestRemoveFoodsByMealTime} from '../../actions';

export default function RecommedNutrition({nutrition, goal}) {
  return (
    <View>
      <View style={{alignItems: 'center'}}>
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
          열량 ({nutrition.calorie} kcal / {goal?.calorie} kcal)
        </Text>
        <NuturitionBarChart
          nuturition={nutrition.calorie}
          goal={goal?.calorie}
        />

        <Text>
          단백질 ({nutrition.protein} g/ {goal?.protein} g)
        </Text>
        <NuturitionBarChart
          nuturition={nutrition.protein}
          goal={goal?.protein}
        />

        <Text>
          인 ({nutrition.phosphorus} mg / {goal?.phosphorus} mg)
        </Text>
        <NuturitionBarChart
          nuturition={nutrition.phosphorus}
          goal={goal?.phosphorus}
        />

        <Text>
          칼륨 ({nutrition.potassium} mg / {goal?.potassium} mg)
        </Text>

        <NuturitionBarChart
          nuturition={nutrition.potassium}
          goal={goal?.potassium}
        />

        <Text>
          나트륨 ({nutrition.sodium} mg / {goal?.sodium} mg)
        </Text>
        <NuturitionBarChart nuturition={nutrition.sodium} goal={goal?.sodium} />
      </View>
    </View>
  );
}
