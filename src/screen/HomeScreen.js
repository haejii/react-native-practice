import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
  Linking,
  Platform,
} from 'react-native';

import {
  FoodInformationModalStyles,
  HomeScreenStyles,
  ScreenStyles,
} from '../style/styles';
import {useSelector, useDispatch} from 'react-redux';
import NuturitionBarChart from '../moduleComponent/NuturitionBarChart';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import {
  changeNuturitionGoal,
  requestUpdateNuturitionGoal,
  requestFoodNutrition,
} from '../actions';
import SearchResult from './Search/firstTab/SearchResult';
import {Route} from 'react-router';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const nuturition = useSelector((state) => state.nuturition);
  const {goal} = useSelector((state) => state.user);
  const meal = useSelector((state) => state.meal);

  const [comp, setComp] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const [nuturitionInput, setNuturitionInput] = useState({
    calorie: goal.calorie,
    protein: goal.protein,
    phosphorus: goal.phosphorus,
    potassium: goal.potassium,
    sodium: goal.sodium,
  });

  useEffect(() => {
    dispatch(requestFoodNutrition());
  }, []);

  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeNuturitionGoal = (name, value) => {
    value = Number(value);
    setNuturitionInput({...nuturitionInput, [name]: value});
  };

  const nuturitionFun = async (nuturitionGoal) => {
    await dispatch(
      requestUpdateNuturitionGoal({
        calorie: nuturitionGoal.calorie,
        protein: nuturitionGoal.protein,
        phosphorus: nuturitionGoal.phosphorus,
        potassium: nuturitionGoal.potassium,
        sodium: nuturitionGoal.sodium,
      }),
    );
  };

  const handlePressUpdateGoal = async (nuturitionGoal) => {
    await nuturitionFun(nuturitionGoal);
    await dispatch(changeNuturitionGoal(nuturitionGoal));
    console.log('nutiritionGoal ' + nuturitionGoal.protein);

    await handlePressModal();
    await setNuturitionInput({
      calorie: nuturitionGoal.calorie,
      protein: nuturitionGoal.protein,
      phosphorus: nuturitionGoal.phosphorus,
      potassium: nuturitionGoal.potassium,
      sodium: nuturitionGoal.sodium,
    });
  };

  const handlePressNonUpdateGoal = () => {
    setNuturitionInput({
      calorie: goal.calorie,
      protein: goal.protein,
      phosphorus: goal.phosphorus,
      potassium: goal.potassium,
      sodium: goal.sodium,
    });
    handlePressModal();
  };

  return (
    <View style={ScreenStyles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={HomeScreenStyles.textTitle}>오늘의 목표</Text>
      </View>

      <View style={HomeScreenStyles.textViewContainer}>
        <TouchableOpacity onPress={() => handlePressModal()}>
          <Text style={HomeScreenStyles.textDetail}>
            열량 ({nuturition.calorie} kcal / {goal?.calorie} kcal)
          </Text>
          <NuturitionBarChart
            nuturition={nuturition.calorie}
            goal={goal?.calorie}
          />

          <Text
            style={{
              ...HomeScreenStyles.textDetail,
              ...HomeScreenStyles.textInterval,
            }}>
            단백질 ({nuturition.protein} g/ {goal?.protein} g)
          </Text>
          <NuturitionBarChart
            nuturition={nuturition.protein}
            goal={goal?.protein}
          />

          <Text
            style={{
              ...HomeScreenStyles.textDetail,
              ...HomeScreenStyles.textInterval,
            }}>
            인 ({nuturition.phosphorus} mg / {goal?.phosphorus} mg)
          </Text>
          <NuturitionBarChart
            nuturition={nuturition.phosphorus}
            goal={goal?.phosphorus}
          />

          <Text
            style={{
              ...HomeScreenStyles.textDetail,
              ...HomeScreenStyles.textInterval,
            }}>
            칼륨 ({nuturition.potassium} mg / {goal?.potassium} mg)
          </Text>

          <NuturitionBarChart
            nuturition={nuturition.potassium}
            goal={goal?.potassium}
          />

          <Text
            style={{
              ...HomeScreenStyles.textDetail,
              ...HomeScreenStyles.textInterval,
            }}>
            나트륨 ({nuturition.sodium} mg / {goal?.sodium} mg)
          </Text>
          <NuturitionBarChart
            nuturition={nuturition.sodium}
            goal={goal?.sodium}
          />
        </TouchableOpacity>
      </View>

      <View style={HomeScreenStyles.mealButtonView}>
        <View style={HomeScreenStyles.mealButtonContainer}>
          <TouchableOpacity
            style={HomeScreenStyles.mealButton}
            onPress={() => {
              meal.breakfast.length === 0
                ? navigation.navigate('검색')
                : navigation.navigate('식단');
            }}>
            <Text style={HomeScreenStyles.mealButtonText}>아침</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={HomeScreenStyles.mealButton}
            onPress={() => {
              meal.lunch.length === 0
                ? navigation.navigate('검색')
                : navigation.navigate('식단');
            }}>
            <Text style={HomeScreenStyles.mealButtonText}>점심</Text>
          </TouchableOpacity>
        </View>
        <View style={HomeScreenStyles.mealButtonContainer}>
          <TouchableOpacity
            style={HomeScreenStyles.mealButton}
            onPress={() => {
              meal.dinner.length === 0
                ? navigation.navigate('검색')
                : navigation.navigate('식단');
            }}>
            <Text style={HomeScreenStyles.mealButtonText}>저녁</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={HomeScreenStyles.mealButton}
            onPress={() => {
              meal.snack.length === 0
                ? navigation.navigate('검색')
                : navigation.navigate('식단');
            }}>
            <Text style={HomeScreenStyles.mealButtonText}>간식</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handlePressModal}>
        <View style={FoodInformationModalStyles.modalViewContainer}>
          <View style={FoodInformationModalStyles.modalView}>
            <View style={HomeScreenStyles.nuturitionInputContainer}>
              <View
                style={{
                  flex: Platform.OS === 'ios' ? 2 : 2,
                  justifyContent: 'center',
                }}>
                <Text style={HomeScreenStyles.nuturitionInputSubject}>
                  목표 섭취량 조절하기
                </Text>
              </View>

              <View style={{flex: 8}}>
                <ScrollView>
                  <Text style={HomeScreenStyles.nuturitionTitle}>열량</Text>
                  <TextInput
                    style={HomeScreenStyles.nuturitionInput}
                    keyboardType="numeric"
                    value={String(nuturitionInput.calorie)}
                    onChangeText={(value) => {
                      handleChangeNuturitionGoal(
                        'calorie',
                        value.replace(/[^0-9]/g, ''),
                      );
                    }}
                  />
                  <Text style={HomeScreenStyles.nuturitionTitle}>단백질</Text>
                  <TextInput
                    style={HomeScreenStyles.nuturitionInput}
                    keyboardType="numeric"
                    value={String(nuturitionInput.protein)}
                    onChangeText={(value) => {
                      handleChangeNuturitionGoal(
                        'protein',
                        value.replace(/[^0-9]/g, ''),
                      );
                    }}
                  />
                  <Text style={HomeScreenStyles.nuturitionTitle}>인</Text>
                  <TextInput
                    style={HomeScreenStyles.nuturitionInput}
                    keyboardType="numeric"
                    value={String(nuturitionInput.phosphorus)}
                    onChangeText={(value) => {
                      handleChangeNuturitionGoal(
                        'phosphorus',
                        value.replace(/[^0-9]/g, ''),
                      );
                    }}
                  />
                  <Text style={HomeScreenStyles.nuturitionTitle}>칼륨</Text>
                  <TextInput
                    style={HomeScreenStyles.nuturitionInput}
                    keyboardType="numeric"
                    value={String(nuturitionInput.potassium)}
                    onChangeText={(value) => {
                      handleChangeNuturitionGoal(
                        'potassium',
                        value.replace(/[^0-9]/g, ''),
                      );
                    }}
                  />
                  <Text style={HomeScreenStyles.nuturitionTitle}>나트륨</Text>
                  <TextInput
                    style={HomeScreenStyles.nuturitionInput}
                    keyboardType="numeric"
                    value={String(nuturitionInput.sodium)}
                    onChangeText={(value) => {
                      handleChangeNuturitionGoal(
                        'sodium',
                        value.replace(/[^0-9]/g, ''),
                      );
                    }}
                  />
                </ScrollView>
              </View>
            </View>

            <View style={FoodInformationModalStyles.modalButtonContainer}>
              <Button
                title="수정"
                onPress={() => handlePressUpdateGoal(nuturitionInput)}
              />
              <Button title="취소" onPress={() => handlePressNonUpdateGoal()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
