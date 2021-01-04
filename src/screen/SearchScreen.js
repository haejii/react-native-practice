import React, {useState} from 'react';
import {Text, View, TextInput, Button, ScrollView} from 'react-native';
import styles from '../style/styles';

import ingredients from '../../foodIngredient.json';
import FoodController from '../controller/FoodController';
import SearchResult from './SearchResult';

export default function SearchScreen() {
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
      {/* <Text>SearchScreen</Text> */}
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
