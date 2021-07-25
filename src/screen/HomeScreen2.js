import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Button,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  BarStyle,
  FoodInformationModalStyles,
  HomeScreenStyles,
  ScreenStyles,
} from '../style/styles';
import {useSelector, useDispatch} from 'react-redux';
import NuturitionBarChart from '../moduleComponent/NuturitionBarChartHome';
import {TextInput} from 'react-native-gesture-handler';
import {
  changeNuturitionGoal,
  requestUpdateNuturitionGoal,
  requestFoodNutrition,
  requestDiets,
  requestFoodRecordWithDate,
} from '../actions';
import SearchResult from './Search/firstTab/SearchResult';
import {Route} from 'react-router';
import NativeButton from 'apsl-react-native-button';
import Modal from 'react-native-modal';

import calendar from '../../assets/image/calendar.png';
import DietHeader from './Diet/DietHeader';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen2({navigation}) {
  const dispatch = useDispatch();

  const nuturition = useSelector((state) => state.nuturition);
  const {goal} = useSelector((state) => state.user);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const dateMeal = useSelector((state) => state.dateMeal);

  const [isOpen, setIsOpen] = useState(false);

  const [nuturitionInput, setNuturitionInput] = useState({
    calorie: goal.calorie,
    protein: goal.protein,
    phosphorus: goal.phosphorus,
    potassium: goal.potassium,
    sodium: goal.sodium,
  });

  let today = `${year}년 ${month}월 ${day}일`;
  let formattedToday = `${year}-${month}-${day}`;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
    setDay(currentDate.getDate());

    const formattedSelectedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    dispatch(requestFoodRecordWithDate(formattedSelectedDate));

    setShow(!show);
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    dispatch(requestFoodRecordWithDate(formattedToday)),
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
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.topView}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 20,
          }}>
          <TouchableOpacity onPress={() => showDatepicker()}>
            <Image style={{width: 30, height: 30}} source={calendar} />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={onChange}
            />
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 110,
          }}>
          <Text style={styles.topText}>오늘의 목표</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => handlePressModal()}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#ec7079',
              marginLeft: 10,
              marginTop: 5,
            }}>
            목표 변경하기
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondView}>
        <View style={styles.graphView}>
          <View style={styles.graphTextView}>
            <Text style={styles.graphText}>
              열량 [{nuturition.calorie} kcal / {goal?.calorie} kcal]
            </Text>
          </View>
          <NuturitionBarChart
            nuturition={nuturition.calorie}
            goal={goal?.calorie}
          />
        </View>

        <View style={styles.graphView}>
          <View style={styles.graphTextView}>
            <Text style={styles.graphText}>
              단백질 [{nuturition.protein} g/ {goal?.protein} g]
            </Text>
          </View>
          <NuturitionBarChart
            nuturition={nuturition.protein}
            goal={goal?.protein}
          />
        </View>

        <View style={styles.graphView}>
          <View style={styles.graphTextView}>
            <Text style={styles.graphText}>
              인 [{nuturition.phosphorus} mg / {goal?.phosphorus} mg]
            </Text>
          </View>
          <NuturitionBarChart
            nuturition={nuturition.phosphorus}
            goal={goal?.phosphorus}
          />
        </View>

        <View style={styles.graphView}>
          <View style={styles.graphTextView}>
            <Text style={styles.graphText}>
              칼륨 [{nuturition.potassium} mg / {goal?.potassium} mg]
            </Text>
          </View>
          <NuturitionBarChart
            nuturition={nuturition.potassium}
            goal={goal?.potassium}
          />
        </View>

        <View style={styles.graphView}>
          <View style={styles.graphTextView}>
            <Text style={styles.graphText}>
              나트륨 [{nuturition.sodium} mg / {goal?.sodium} mg]
            </Text>
          </View>
          <NuturitionBarChart
            nuturition={nuturition.sodium}
            goal={goal?.sodium}
          />
        </View>
      </View>

      <Modal
        isVisible={isOpen}
        transparent={true}
        onRequestClose={handlePressModal}>
        <View style={FoodInformationModalStyles.modalViewContainer}>
          <View style={FoodInformationModalStyles.modalView}>
            <View style={HomeScreenStyles.nuturitionInputContainer}>
              <View
                style={{
                  flex: Platform.OS === 'ios' ? 2 : 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={HomeScreenStyles.nuturitionInputSubject}>
                  목표 섭취량 조절하기
                </Text>
              </View>

              <View style={{flex: 9}}>
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
              <NativeButton
                style={{
                  width: 145,
                  height: 30,
                  borderRadius: 5,
                  backgroundColor: '#cdcdcd',
                  color: 'white',
                  borderColor: '#cdcdcd',
                }}
                onPress={() => handlePressUpdateGoal(nuturitionInput)}>
                수정
              </NativeButton>
              <NativeButton
                style={{
                  width: 145,
                  height: 30,
                  borderRadius: 5,
                  backgroundColor: '#cdcdcd',
                  borderColor: '#cdcdcd',
                }}
                onPress={() => handlePressNonUpdateGoal()}>
                취소
              </NativeButton>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{marginLeft: 15, marginTop: 15, width: '92%'}}>
        <DietHeader
          meal={dateMeal}
          goal={goal}
          date={formattedToday}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topView: {
    height: 45,

    borderBottomWidth: 1,
    borderColor: '#e9eaec',
    flexDirection: 'row',
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
    marginBottom: 10,
    borderRadius: 5,
  },
  dietHeaderView: {
    flexDirection: 'row',
  },
  dietHeaderImage: {
    width: 40,
    height: 30,
    marginRight: 15,
  },
  dietHeaderTextView: {
    marginTop: 5,
  },
  dietHeaderSubTextView: {
    marginTop: 5,
    marginLeft: 20,
  },
});
