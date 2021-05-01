import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  requestFoodCategory,
  requestFoods,
  requestFoodsByCategory,
  setError,
} from '../../../actions';
import SearchResult from './SearchResult';
import FoodInformationModal from './FoodInformationModal';
import {SearchResultStyles} from '../../../style/styles';
import errors from '../../../utils/errors';

export default function Search() {
  const dispatch = useDispatch();

  const searchedFoodResults = useSelector((state) => state.searchedFoodResults);
  const error = useSelector((state) => state.error);
  const foodCategories = useSelector((state) => state.foodCategories);

  const handlePressSearch = () => {
    if (!food.trim()) {
      Alert.alert('검색오류', '음식이름을 입력해주세요.');
      return;
    }
    dispatch(requestFoods(food));
  };

  const handleChangeFoodField = (name, value) => {
    setFood(value);
  };

  const [food, setFood] = useState('');

  const handlePressSelectCategory = (category) => {
    dispatch(requestFoodsByCategory(category));
  };

  useEffect(() => {
    // 음식 카테고리 호출
    dispatch(requestFoodCategory());
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 2,
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

      {foodCategories ? (
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
            카테고리를 선택하면 하위 메뉴를 볼 수 있습니다.
          </Text>
          <ScrollView style={{width: '80%'}}>
            {foodCategories.map((category, idx) => (
              <TouchableOpacity
                style={{
                  backgroundColor: 'hotpink',
                  width: '100%',
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 5,
                }}
                key={idx}
                onPress={() => handlePressSelectCategory(category)}>
                <Text
                  style={{
                    color: 'white',
                    width: '100%',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginVertical: 10,
        }}
      />

      {error.status ? (
        <View
          style={{
            alignItems: 'center',
          }}>
          {error.name === errors.FOOD_NOT_FOUND ? (
            <Text style={{fontSize: 20, color: 'hotpink'}}>
              검색결과가 없습니다. {'\n'} 다시 검색해주세요.
            </Text>
          ) : error.name === errors.REQUEST_FOOD_ERROR ? (
            <Text style={{fontSize: 20, color: 'hotpink'}}>
              서버로 부터 응답이 없습니다. {'\n'} 잠시 후 다시 시도해주세요.
            </Text>
          ) : null}
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              marginBottom: 5,
            }}>
            검색 결과
          </Text>
        </View>
      )}

      <View style={{flex: 4}}>
        <SafeAreaView>
          <FlatList
            data={searchedFoodResults}
            keyExtractor={(item) => String(item.foodId)}
            renderItem={({item, index, separators}) => (
              <View
                style={SearchResultStyles.searchResultContainer}
                key={index}>
                <FoodInformationModal food={item} />
              </View>
            )}>
            {/* <ScrollView> */}
            {/* <SearchResult result={searchedFoodResults} /> */}
            {/* </ScrollView> */}
          </FlatList>
        </SafeAreaView>
      </View>
    </View>
  );
}
