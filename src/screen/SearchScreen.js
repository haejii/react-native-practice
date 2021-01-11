import React, {useState} from 'react';
import {Text, View, TextInput, Button, ScrollView} from 'react-native';
import styles from '../style/styles';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ingredients from '../../foodIngredient.json';
import FoodController from '../controller/FoodController';
import SearchResult from './SearchResult';

const Tab = createMaterialTopTabNavigator();

function Test() {
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
        component={Test}
        options={{tabBarLabel: '검색'}}
      />
      <Tab.Screen
        name="Notifications"
        component={Test}
        options={{tabBarLabel: '찜'}}
      />
      <Tab.Screen
        name="Profile"
        component={Test}
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
