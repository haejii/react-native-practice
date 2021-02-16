import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {addFood, addMeal, addNuturition, saveFood} from '../actions';
import ingredients from '../../foodIngredient.json';
import FoodController from '../controller/FoodController';
import SearchResult from './SearchResult';
import styles from '../style/styles';

const Tab = createMaterialTopTabNavigator();

function Search() {
  const handlePressSearch = () => {
    setSearchResult(FoodController.findByFoodName(food));
  };

  const handleChangeFoodField = (name, value) => {
    setFood(value);
  };

  const [food, setFood] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row',
        }}>
        <TextInput
          // style={styles.loginField}
          style={{
            width: '60%',
            backgroundColor: 'white',
            height: '20%',
            paddingHorizontal: 10,
            fontSize: 16,
            marginBottom: '1%',
            marginRight: '5%',
          }}
          placeholder="검색할 음식 이름을 입력해주세요."
          autoCapitalize="none"
          value={food}
          onChangeText={(value) => handleChangeFoodField('username', value)}
        />
        <Button title="검색" onPress={() => handlePressSearch()} />
      </View>
      <View style={{flex: 3}}>
        <ScrollView>
          <SearchResult result={searchResult} />
        </ScrollView>
      </View>
    </View>
  );
}

function StoredFood() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  const storedFood = useSelector((state) => state.storedFood);

  const handlePressAdd = (food) => {
    Alert.alert(
      '식사 시기를 선택해주세요.',
      '',
      [
        {
          text: '아침',
          onPress: () => {
            dispatch(addMeal('breakfast', food.id));
            dispatch(addNuturition(food));
            handlePressModal();
          },
        },
        {
          text: '점심',
          onPress: () => {
            dispatch(addMeal('lunch', food.id));
            dispatch(addNuturition(food));
            handlePressModal();
          },
        },
        {
          text: '저녁',
          onPress: () => {
            dispatch(addMeal('dinner', food.id));
            dispatch(addNuturition(food));
            handlePressModal();
          },
        },
        {
          text: '간식',
          onPress: () => {
            dispatch(addMeal('snack', food.id));
            dispatch(addNuturition(food));
            handlePressModal();
          },
        },
        {
          text: '취소',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

    // dispatch(addFood(food.id));
    // dispatch(addNuturition(food));
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              width: '100%',
              paddingVertical: 40,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {FoodController.findFoodsByIds(storedFood).map((food, idx) => {
              // const food = FoodController.findByFoodId(foodId);
              return (
                <TouchableOpacity
                  onPress={() => {
                    handlePressModal();
                  }}
                  style={{
                    width: '90%',
                    height: 40,
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'skyblue',
                    paddingHorizontal: 10,
                    borderRadius: 8,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 22, color: 'white'}}>
                      {food.name}
                    </Text>

                    {/* <Button title="Open Modal" onPress={() => handlePressModal()} /> */}

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
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 24,
                                marginBottom: 20,
                              }}>
                              {food.name}
                            </Text>
                            <Text style={{fontSize: 20}}>
                              칼로리: {food.calorie} kcal
                            </Text>
                            <Text style={{fontSize: 20}}>
                              탄수화물: {food.carbohydrate} g
                            </Text>
                            <Text style={{fontSize: 20}}>
                              단백질: {food.protein} g
                            </Text>
                            <Text style={{fontSize: 20}}>
                              지방: {food.fat} g
                            </Text>
                            <Text style={{fontSize: 20}}>
                              나트륨: {food.sodium} mg
                            </Text>
                            <Text style={{fontSize: 20}}>
                              칼슘: {food.calcium} mg
                            </Text>
                            <Text style={{fontSize: 20}}>
                              칼륨: {food.potassium} mg
                            </Text>
                            <Text style={{fontSize: 20}}>
                              철: {food.iron} mg
                            </Text>
                            <Text style={{fontSize: 20}}>
                              인: {food.phosphorus} mg
                            </Text>
                          </View>

                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              width: '80%',
                            }}>
                            <Button
                              title="추가"
                              onPress={() => handlePressAdd(food)}
                            />
                            <Button
                              title="닫기"
                              onPress={() => handlePressModal()}
                            />
                            <Button
                              title="삭제"
                              onPress={() => handlePressModal()}
                            />
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default function SearchScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
        style: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen
        name="Feed"
        component={Search}
        options={{tabBarLabel: '검색'}}
      />
      <Tab.Screen
        name="Notifications"
        component={StoredFood}
        options={{tabBarLabel: '찜'}}
      />
      <Tab.Screen
        name="Profile"
        component={Search}
        options={{tabBarLabel: '내 음식'}}
      />
    </Tab.Navigator>
  );

  // return (
  //   <View style={{flex: 1}}>
  //     {/* <Text>SearchScreen</Text> */}
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         width: '100%',
  //         flexDirection: 'row',
  //       }}>
  //       <TextInput
  //         // style={styles.loginField}
  //         style={{
  //           width: '60%',
  //           backgroundColor: 'white',
  //           height: '20%',
  //           paddingHorizontal: 10,
  //           fontSize: 16,
  //           marginBottom: '1%',
  //           marginRight: '5%',
  //         }}
  //         placeholder="검색할 음식 이름을 입력해주세요."
  //         autoCapitalize="none"
  //         value={food}
  //         onChangeText={(value) => handleChangeFoodField('username', value)}
  //       />
  //       <Button title="검색" onPress={() => handlePressSearch()} />
  //     </View>
  //     <View style={{flex: 3}}>
  //       <ScrollView>
  //         <SearchResult result={searchResult} />
  //       </ScrollView>
  //     </View>
  //   </View>
  // );
}
