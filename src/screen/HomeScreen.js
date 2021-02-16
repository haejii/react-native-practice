import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Modal, Button} from 'react-native';
import {BarChart, Grid} from 'react-native-svg-charts';
import {Text as SVGText} from 'react-native-svg';

import styles from '../style/styles';
import {useSelector} from 'react-redux';
import FoodController from '../controller/FoodController';
import MealTimeSum from './MealTimeSum';

export default function HomeScreen() {
  const data = [50, 10, 40, 95, 85];

  const CUT_OFF = 50;
  const Labels = ({x, y, bandwidth, d}) =>
    d.map((value, index) => (
      <>
        <SVGText
          key={index}
          x={value > CUT_OFF ? x(0) + 10 : x(value) + 10}
          y={y(index) + bandwidth / 2}
          fontSize={20}
          fill={value > CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}>
          {value}
        </SVGText>
      </>
    ));

  const nuturition = useSelector((state) => state.nuturition);
  const meal = useSelector((state) => state.meal);

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePressMealButton = (num) => {
    console.log(num);
    let time = '';

    if (num === 0) {
      time = 'snack';
    } else if (num === 1) {
      time = 'breakfast';
    } else if (num === 2) {
      time = 'lunch';
    } else {
      time = 'dinner';
    }

    setCurrent(time);
    handlePressModal();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          height: 300,
          paddingVertical: 30,
          flex: 2,
          // width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <BarChart
          style={{flex: 1, marginLeft: 8, width: '80%'}}
          data={data}
          horizontal={true}
          svg={{fill: 'rgba(134, 165, 244, 0.9)'}}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          gridMin={0}>
          <Grid direction={Grid.Direction.VERTICAL} />
          <Labels d={data} />
        </BarChart> */}
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
          오늘의 목표
        </Text>

        <Text style={{fontSize: 20}}>
          칼로리: {nuturition.calorie} / 2000 kcal
        </Text>
        <Text style={{fontSize: 20}}>단백질: {nuturition.protein} / 85 g</Text>
        <Text style={{fontSize: 20}}>
          나트륨: {nuturition.sodium} / 2000 mg
        </Text>
        <Text style={{fontSize: 20}}>인: {nuturition.phosphorus} / 800 mg</Text>
        <Text style={{fontSize: 20}}>
          칼륨: {nuturition.potassium} / 2000 mg
        </Text>
      </View>
      <View style={{flex: 3, width: '100%', height: '100%'}}>
        <View style={styles.mealButtonContainer}>
          <TouchableOpacity
            style={styles.mealButton}
            onPress={() => handlePressMealButton(1)}>
            <Text style={{fontSize: 24}}>아침</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mealButton}
            onPress={() => handlePressMealButton(2)}>
            <Text style={{fontSize: 24}}>점심</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mealButtonContainer}>
          <TouchableOpacity
            style={styles.mealButton}
            onPress={() => handlePressMealButton(3)}>
            <Text style={{fontSize: 24}}>저녁</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mealButton}
            onPress={() => handlePressMealButton(0)}>
            <Text style={{fontSize: 24}}>간식</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handlePressModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 0,
              backgroundColor: 'white',
              borderRadius: 20,
              borderWidth: 1,
              width: '80%',
              height: '60%',
              justifyContent: 'center',
              alignItems: 'center',

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <View
              style={{
                flex: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 30}}>{current}</Text>

              {meal[current]
                ? meal[current].map((foodId, idx) => {
                    const food = FoodController.findByFoodId(foodId);

                    return (
                      <View
                        style={{
                          top: 20,
                          width: '80%',
                          height: 30,
                          marginBottom: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'skyblue',
                          paddingHorizontal: 10,
                          borderRadius: 8,
                        }}
                        key={idx}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 20, color: 'white'}}>
                            {food.name}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                : null}

              <MealTimeSum
                sum={
                  meal[current]
                    ? FoodController.calculateNuturitionFoods(meal[current])
                    : null
                }
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '80%',
              }}>
              <Button title="추가" onPress={() => {}} />
              <Button title="닫기" onPress={() => handlePressModal()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
