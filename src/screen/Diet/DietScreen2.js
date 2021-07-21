import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch, useSelector} from 'react-redux';
import NativeButton from 'apsl-react-native-button';
import {
  requestFoodRecord,
  requestRemoveFood,
  requestFoodRecordWithDate,
  requestDiets,
  requestAllDiets,
  requestCertainDiet,
} from '../../actions';
import DietHeader from './DietHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SERVER_PATH} from '../../service/apis';
import Recommend from './recomend';
import {
  DietModalStyles,
  FoodInformationModalStyles,
  MyPageScreenStyles,
  ScreenStyles,
} from '../../style/styles';
import FoodInformationModal from '../Search/firstTab/FoodInformationModal';
import DietHeader2 from './DiteHeader2';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAddressCard,
  faUniversalAccess,
  faTransgender,
  faChevronRight,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';

const Tab = createMaterialTopTabNavigator();

function MyDiet({navigation}) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const goal = useSelector((state) => state.user.goal);
  const dateMeal = useSelector((state) => state.dateMeal);

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

  const handlePressAnotherRecipe = () => {
    dispatch(requestFoodRecordWithDate(formattedToday));
  };

  useEffect(() => {
    dispatch(requestFoodRecordWithDate(formattedToday));
  }, []);

  return (
    <View style={{backgroundColor: 'white'}}>
      <View>
        <TouchableOpacity style={{margin: 10}} onPress={() => showDatepicker()}>
          <FontAwesomeIcon icon={faTransgender} size={20} />
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

      <View style={{marginLeft: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{today}</Text>
      </View>

      <ScrollView>
        {/* <DietHeader meal={dateMeal} goal={goal} date={formattedToday} /> */}
        <DietHeader2
          navigation={navigation}
          meal={dateMeal}
          goal={goal}
          date={formattedToday}
        />
      </ScrollView>
    </View>
  );
}

function RecommendDiet() {
  const dispatch = useDispatch();
  const [btn, setBtn] = useState(1);
  const gender = useSelector((state) => state.user.gender);
  const kidneyType = useSelector((state) => state.user.kidneyType);
  const dietMeal = useSelector((state) => state.diet);
  const [isOpen, setIsOpen] = useState(false);
  const Alldiets = useSelector((state) => state.allDite);

  const convertMealTime = {
    1: 'breakfast',
    2: 'lunch',
    3: 'dinner',
    4: 'snack',
  };
  useEffect(() => {
    // dispatch(requestAllDiets(kidneyType, gender)),
    dispatch(requestDiets(kidneyType, gender));
  }, []);

  const handlePressAnotherRecipe = () => {
    dispatch(requestDiets(kidneyType, gender));
  };

  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePressDiet = (key) => {
    dispatch(requestCertainDiet(key));
    setIsOpen(!isOpen);
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginTop: 15,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            오늘의 추천식단
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <NativeButton
            style={{
              width: 150,
              height: 30,
              backgroundColor: 'yellow',
              alignSelf: 'center',
            }}
            onPress={() => handlePressAnotherRecipe()}>
            다른추천식단보기
          </NativeButton>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 3}}>
            <NativeButton
              style={{
                margin: 3,
                width: 50,
                height: 30,
                backgroundColor: btn === 1 ? 'skyblue' : 'white',
              }}
              onPress={() => setBtn(1)}>
              아침
            </NativeButton>
          </View>
          <View style={{marginRight: 3}}>
            <NativeButton
              style={{
                margin: 3,
                width: 50,
                height: 30,
                backgroundColor: btn === 2 ? 'skyblue' : 'white',
              }}
              onPress={() => setBtn(2)}>
              점심
            </NativeButton>
          </View>
          <View style={{marginRight: 3}}>
            <NativeButton
              style={{
                margin: 3,
                width: 50,
                height: 30,
                backgroundColor: btn === 3 ? 'skyblue' : 'white',
              }}
              onPress={() => setBtn(3)}>
              저녁
            </NativeButton>
          </View>

          <View style={{marginRight: 3}}>
            <NativeButton
              style={{
                margin: 3,
                width: 50,
                height: 30,
                backgroundColor: btn === 4 ? 'skyblue' : 'white',
              }}
              onPress={() => setBtn(4)}>
              간식
            </NativeButton>
          </View>
        </View>

        {/* <Recommend2 btn={btn} gender={gender} kidneyType={kidneyType} /> */}

        <Recommend
          btn={btn}
          gender={gender}
          kidneyType={kidneyType}
          //nutrition={{calorie, protein, phosphorus, potassium, sodium}}
        />
      </ScrollView>

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handlePressModal}>
        <View style={DietModalStyles.modalViewContainer}>
          <View style={DietModalStyles.modalView}>
            <View style={DietModalStyles.modalContent}>
              <ScrollView>
                <View
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    추천식단 모두 보기
                  </Text>
                  <Text style={{color: 'red'}}>
                    (식단을 가져오고 싶으면 클릭해주세요)
                  </Text>
                </View>
                {Object.keys(Alldiets).map((key, i) => {
                  return (
                    <View
                      style={{marginLeft: 12, marginRight: 12, marginTop: 15}}
                      key={key + i}>
                      <TouchableOpacity
                        style={{
                          borderColor: 'black',
                          borderWidth: 1,
                          borderRadius: 15,
                          backgroundColor: '#D9F4FA',
                          padding: 10,
                        }}
                        onPress={() => handlePressDiet(key)}>
                        <Text style={{fontWeight: 'bold'}}>
                          아침: {Alldiets[key]?.['breakfast']}{' '}
                        </Text>

                        <Text style={{fontWeight: 'bold'}}>
                          점심: {Alldiets[key]?.['lunch']}
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>
                          저녁: {Alldiets[key]?.['dinner']}
                        </Text>
                        {Alldiets[key]?.['snack'] !== 'undefined' ? (
                          <Text style={{fontWeight: 'bold'}}>
                            간식: {Alldiets[key]?.['snack']}
                          </Text>
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Recipe({navigation}) {
  const dispatch = useDispatch();

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 20}}>
          소고기배추볶음
        </Text>
      </View>

      <View style={{marginLeft: 10, marginTop: 10}}>
        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>
          준비해주세요!
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 20,
            marginRight: 10,
            marginTop: 5,
            marginBottom: 20,
          }}>
          <Text>소고기 50g, 배추 50g, 대파5g, 양파5g</Text>
        </View>

        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>
          조리순서
        </Text>
        <Text>
          {`
          1. 소고기는 핏물을 빼고 2cm 폭으로 썬다.

          2. 소고기와 양념을 넣고 버무려 15분간 둔다.
          
          3. 배추잎은 1cm 폭으로 썰어 줄기와 잎부분을 분리해놓는다. 
             대파는 어슷 썬다. 
          
          4. 줄기부분을 고기양념에 10분간 절인 후 손으로 살짝 짠다.
          
          5. 팬을 달구어 식용유를 두르고 대파를 넣어 센불에서 10초,
             소고기와 배추줄기를 넣고 3분간 볶는다.
          
          6. 배추의 잎부부을 넣고 센불에서 30초~1분간 볶는다. 
             참기름을 넣어 마무리한다
          `}
        </Text>
      </View>
    </View>
  );
}

export default function DietScreen2() {
  return (
    <Tab.Navigator
      initialRouteName="MyDiet"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
        style: {backgroundColor: 'white', height: 50},
      }}>
      <Tab.Screen
        name="MyDiet"
        component={MyDiet}
        options={{tabBarLabel: '내 식단'}}
      />
      <Tab.Screen
        name="RecommendDiet"
        component={RecommendDiet}
        options={{tabBarLabel: '추천식단'}}
      />
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{tabBarLabel: '레시피'}}
      />
    </Tab.Navigator>
  );
}
