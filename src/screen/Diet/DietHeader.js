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

export default function DietHeader({meal, goal, date}) {
  return (
    <View>
      {Object.keys(meal).map((key, i) => {
        const calorie = meal[key]
          .map((food) => food.calorie)
          .reduce((acc, curr) => acc + curr, 0);

        const protein = meal[key]
          .map((food) => food.protein)
          .reduce((acc, curr) => acc + curr, 0);

        const phosphorus = meal[key]
          .map((food) => food.phosphorus)
          .reduce((acc, curr) => acc + curr, 0);

        const potassium = meal[key]
          .map((food) => food.potassium)
          .reduce((acc, curr) => acc + curr, 0);

        const sodium = meal[key]
          .map((food) => food.sodium)
          .reduce((acc, curr) => acc + curr, 0);

        return (
          <View style={{flexDirection: 'row'}} key={i + key}>
            <TouchableOpacity style={{width: '80%'}}>
              <Collapse isExpanded={meal[key].length > 0}>
                <CollapseHeader
                  style={{
                    borderWidth: 1,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderColor: 'white',
                    backgroundColor: 'skyblue',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {convertMealTimeEnglishToKorean(key)}
                  </Text>
                </CollapseHeader>

                <CollapseBody>
                  <DietDetail foods={meal[key]} date={date} />
                </CollapseBody>
              </Collapse>
            </TouchableOpacity>

            <DietModal
              foods={meal[key]}
              mealTime={convertMealTimeEnglishToKorean(key)}
              nutrition={{calorie, protein, phosphorus, potassium, sodium}}
              goal={goal}
              date={date}
            />
          </View>
        );
      })}
    </View>
  );
}
