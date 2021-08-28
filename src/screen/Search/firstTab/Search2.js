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
  changeFoodsByCategory,
  requestFoodCategory,
  requestFoods,
  requestFoodsByCategory,
  setError,
} from '../../../actions';
import SearchResult from './SearchResult';
import FoodInformationModal from './FoodInformationModal';
import {SearchResultStyles} from '../../../style/styles';
import errors from '../../../utils/errors';
import Modal from 'react-native-modal';
import NativeButton from 'apsl-react-native-button';

export default function Search() {
  const dispatch = useDispatch();

  const searchedFoodResults = useSelector((state) => state.searchedFoodResults);
  const error = useSelector((state) => state.error);
  const foodCategories = useSelector((state) => state.foodCategories);
  const [isOpen, setIsOpen] = useState(false);

  const handlePressSearch = () => {
    if (!food.trim()) {
      Alert.alert('검색오류', '음식이름을 입력해주세요.');
      return;
    }
    setIsOpen(true);
    dispatch(requestFoods(food));
    dispatch(changeFoodsByCategory(null));
  };

  const handleChangeFoodField = (name, value) => {
    setFood(value);
  };

  const [food, setFood] = useState('');

  const handlePressSelectCategory = (category, selectedIndex) => {
    setIsOpen(true);
    dispatch(requestFoodsByCategory(category));
    dispatch(changeFoodsByCategory(selectedIndex));
  };

  const handlePressModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    // 음식 카테고리 호출
    dispatch(requestFoodCategory());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            width: '80%',
            backgroundColor: '#EAEBEF',
            height: 40,
            paddingHorizontal: 10,
            fontSize: 16,
            marginTop: '2%',
            marginLeft: '2%',
            borderRadius: 5,
          }}
          placeholder="검색할 음식 이름을 입력해주세요."
          autoCapitalize="none"
          value={food}
          onChangeText={(value) => handleChangeFoodField('username', value)}
        />

        <NativeButton
          onPress={() => handlePressSearch()}
          style={{
            width: '15%',
            height: 30,
            marginTop: '3%',
            marginLeft: '3%',
          }}>
          검색
        </NativeButton>
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
            {foodCategories.map(({name, selected}, idx) => (
              <TouchableOpacity
                style={{
                  backgroundColor: selected ? 'hotpink' : 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                  width: '100%',
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 5,
                }}
                key={idx}
                onPress={() => handlePressSelectCategory(name, idx)}>
                <Text
                  style={{
                    color: selected ? 'white' : 'black',
                    width: '100%',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
      <Modal
        visible={isOpen}
        swipeDirection="down"
        transparent={true}
        style={{justifyContent: 'flex-end'}}
        onRequestClose={handlePressModal}>
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
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
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

        <View
          style={{
            width: '100%',
            height: 400,
            backgroundColor: 'white',
            marginBottom: 0,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginTop: 10,
          }}>
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
              )}></FlatList>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}
