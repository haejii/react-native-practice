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
}
