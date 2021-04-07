import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, Button, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {requestFoods, setError} from '../../../actions';
import SearchResult from './SearchResult';

export default function Search2() {
  const dispatch = useDispatch();

  const searchedFoodResults = useSelector((state) => state.searchedFoodResults);
  const error = useSelector((state) => state.error);

  const handlePressSearch = () => {
    dispatch(requestFoods(food));
  };

  const handleChangeFoodField = (name, value) => {
    setFood(value);
  };

  const [food, setFood] = useState('');

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
      {error.status ? (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'hotpink'}}>
            검색결과가 없습니다. 다시 검색해주세요.
          </Text>
        </View>
      ) : null}
      <View style={{flex: 3}}>
        <ScrollView>
          <SearchResult result={searchedFoodResults} />
        </ScrollView>
      </View>
    </View>
  );
}
