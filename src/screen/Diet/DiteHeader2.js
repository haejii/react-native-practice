import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {convertMealTimeEnglishToKorean} from '../../utils/convertData';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import DietDetail from './DietDetail';
import DietModal from './DietModal';
import {ScrollView} from 'react-native-gesture-handler';
import DietModal2 from './DietModal2y';

export default function DietHeader2({meal, goal, date, navigation}) {
  return (
    <View>
      {Object.keys(meal).map((key, i) => {
        const calorie = meal[key]
          .map((food) => food.calorie)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const protein = meal[key]
          .map((food) => food.protein)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const phosphorus = meal[key]
          .map((food) => food.phosphorus)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const potassium = meal[key]
          .map((food) => food.potassium)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const sodium = meal[key]
          .map((food) => food.sodium)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        return (
          <View style={{flexDirection: 'row'}} key={i + key}>
            {meal[key].length > 0 ? (
              <View
                style={{
                  height: 130,
                  borderBottomWidth: 1,
                  margin: 15,
                  width: '90%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {convertMealTimeEnglishToKorean(key)}
                  </Text>
                  <DietModal2
                    foods={meal[key]}
                    mealTime={convertMealTimeEnglishToKorean(key)}
                    nutrition={{
                      calorie,
                      protein,
                      phosphorus,
                      potassium,
                      sodium,
                    }}
                    goal={goal}
                    date={date}
                  />
                </View>
                <ScrollView>
                  <DietDetail foods={meal[key]} date={date} />
                </ScrollView>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  height: 130,
                  borderBottomWidth: 1,
                  margin: 15,
                  width: '90%',
                }}
                onPress={() => navigation.navigate('검색')}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {convertMealTimeEnglishToKorean(key)}
                </Text>
                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 15, color: 'gray'}}>
                    - 식단을 입력해주세요
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* <DietModal
              foods={meal[key]}
              mealTime={convertMealTimeEnglishToKorean(key)}
              nutrition={{calorie, protein, phosphorus, potassium, sodium}}
              goal={goal}
              date={date}
            /> */}
          </View>
        );
      })}
    </View>
  );
}
