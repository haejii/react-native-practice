import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Modal, Button} from 'react-native';
import {BarChart, Grid} from 'react-native-svg-charts';
import {Text as SVGText} from 'react-native-svg';

import styles from '../style/styles';
import {useSelector} from 'react-redux';
import FoodController from '../controller/FoodController';
import MealTimeSum from './MealTimeSum';
import {convertMealTime} from '../utils/functions';
import NuturitionBarChart from '../moduleComponent/NuturitionBarChart';

export default function HomeScreen() {
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
          width: '100%',
          paddingHorizontal: 20,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>
          오늘의 목표
        </Text>

        <Text style={{fontSize: 20}}>
          열량 ({nuturition.calorie} kcal / 2000 kcal)
        </Text>
        <NuturitionBarChart nuturition={nuturition.calorie} />

        <Text style={{fontSize: 20, marginTop: 5}}>
          단백질 ({nuturition.protein} g/ 85 g)
        </Text>
        <NuturitionBarChart nuturition={nuturition.calorie} />

        <Text style={{fontSize: 20, marginTop: 5}}>
          인 ({nuturition.phosphorus} mg / 800 mg)
        </Text>
        <NuturitionBarChart nuturition={nuturition.phosphorus} />

        <Text style={{fontSize: 20, marginTop: 5}}>
          칼륨 ({nuturition.potassium} mg / 2000 mg)
        </Text>
        <NuturitionBarChart nuturition={nuturition.potassium} />

        <Text style={{fontSize: 20, marginTop: 5}}>
          나트륨 ({nuturition.sodium} mg / 2000 mg)
        </Text>
        <NuturitionBarChart nuturition={nuturition.sodium} />
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
              <Text style={{fontSize: 30}}>{convertMealTime(current)}</Text>

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
