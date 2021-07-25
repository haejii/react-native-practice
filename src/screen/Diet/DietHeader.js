import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {convertMealTimeEnglishToKorean} from '../../utils/convertData';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import DietDetail from './DietDetail';
import DietModal from './DietModal';
import {ScrollView} from 'react-native-gesture-handler';
import morning from '../../../assets/image/brakfast.png';
import dinner from '../../../assets/image/dinner.png';
import lunch from '../../../assets/image/lunch.png';
import snack from '../../../assets/image/snack.png';
import plus from '../../../assets/image/plus.png';
import NativeButton from 'apsl-react-native-button';

export default function DietHeader({meal, goal, date, navigation}) {
  const imageAssets = [morning, lunch, dinner, snack];
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
            <TouchableOpacity style={{width: '82%'}}>
              <Collapse>
                <CollapseHeader style={styles.dietHeader}>
                  <View style={styles.dietHeaderView}>
                    <Image
                      style={styles.dietHeaderImage}
                      source={imageAssets[i]}
                    />
                    <View style={styles.dietHeaderTextView}>
                      <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                        {convertMealTimeEnglishToKorean(key)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('검색')}>
                      <Image
                        style={{
                          marginLeft: 200,
                          marginTop: 8,
                          height: 20,
                          width: 20,
                        }}
                        source={plus}
                      />
                    </TouchableOpacity>
                  </View>
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

const styles = StyleSheet.create({
  topView: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e9eaec',
  },
  topText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333333',
    letterSpacing: 0,
    textAlign: 'center',
  },
  secondView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  graphView: {
    backgroundColor: '#eaebef',
    width: '92%',
    height: 60,
    margin: 5,
    borderRadius: 10,
  },
  graphTextView: {
    marginLeft: 12,
    marginTop: 10,
    marginBottom: 5,
  },
  graphText: {
    fontSize: 13,
  },
  dietHeader: {
    backgroundColor: '#eaebef',
    marginBottom: 5,
    borderRadius: 5,
    height: 35,
  },
  dietHeaderView: {
    flexDirection: 'row',
  },
  dietHeaderImage: {
    marginTop: 10,
    marginLeft: 10,
    width: 30,
    height: 20,
    marginRight: 15,
  },
  dietHeaderTextView: {
    marginTop: 10,
  },
  dietHeaderSubTextView: {
    marginTop: 5,
    marginLeft: 20,
  },
});
