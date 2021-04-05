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
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import NativeButton from 'apsl-react-native-button';

import {pickerItems} from '../../assets/data/pickerData';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RNPickerSelect from 'react-native-picker-select';
import {addFood, addMeal, addNuturition, saveFood} from '../actions';
import ingredients from '../../foodIngredient.json';
import FoodController from '../controller/FoodController';
import SearchResult from './SearchResult';
import {ContentScreenStyle} from '../style/styles';
import FoodInformationModal from './FoodInformationModal';

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
          style={{
            width: '60%',
            backgroundColor: 'white',
            height: 50,
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
  const storedFood = useSelector((state) => state.storedFood);

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
              return (
                <FoodInformationModal food={food} key={idx} type={'stored'} />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function BasketFood() {
  const meal = useSelector((state) => state.meal);
  const basket = useSelector((state) => state.basket);
  const [mealTime, setMealTime] = useState('');

  function handleChange() {
    console.log(meal);
  }

  return (
    <View>
      <View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'white',
            backgroundColor: 'pink',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>나의 메뉴</Text>
        </TouchableOpacity>
      </View>

      <View>
        {Object.keys(meal).map((key, i) => (
          <View key={i}>
            <TouchableOpacity>
              <View>
                <ScrollView style={{paddingHorizontal: 10, paddingVertical: 5}}>
                  {FoodController.findFoodsByIds(meal[key]).map((food) => (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{paddingVertical: 5}}>- {food.name}</Text>
                      <NativeButton
                        style={ContentScreenStyle.removeBtn}
                        textStyle={{color: 'white'}}>
                        -
                      </NativeButton>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View>
        <Text
          style={{
            fontSize: 17,
          }}>
          식사시기
        </Text>
        <RNPickerSelect
          onValueChange={(value) => {
            handleChange();
          }}
          placeholder={pickerItems.MealTypes.placeholder({
            value: null,
          })}
          value={mealTime}
          items={pickerItems.MealTypes.items}
          style={pickerSelectStyles}
        />
        <View>
          <NativeButton>추가하기</NativeButton>
        </View>
      </View>
    </View>
  );
}

export default function SearchScreen() {
  const count = useSelector((state) => state.foodCount);
  let basketName = `담기( ${count})`;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {fontSize: 20, fontWeight: 'bold'},
        style: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{tabBarLabel: '검색'}}
      />
      <Tab.Screen
        name={basketName}
        component={BasketFood}
        options={{tabBarLable: '담기'}}
      />
      <Tab.Screen
        name="StoredFood"
        component={StoredFood}
        options={{tabBarLabel: '찜'}}
      />
      <Tab.Screen
        name="MyFood"
        component={Search}
        options={{tabBarLabel: '내 음식'}}
      />
    </Tab.Navigator>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '80%',
    fontSize: 18,
    fontWeight: '800',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 30,
  },
});
