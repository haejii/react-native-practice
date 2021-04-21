import {DrawerContentScrollView} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import NuturitionBarChart from '../../../moduleComponent/NuturitionBarChart';

import {useDispatch, useSelector} from 'react-redux';
import {
  addMeal,
  addNuturition,
  deleteFood,
  saveFood,
  changeCount,
  addBasket,
} from '../../../actions';
import {
  FoodInformationModalStyles,
  HomeScreenStyles,
} from '../../../style/styles';

export default function FoodInformationModal({food, onPress, type}) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const {goal} = useSelector((state) => state.user);
  const basketFoods = useSelector((state) => state.basketFoods);

  const [inputMeal, setInputMeal] = useState('100');
  const [change, setChange] = useState(false);
  const [calorie, setCalorie] = useState(food.calorie);
  const [protein, setProtein] = useState(food.protein);
  const [phosphorus, setPhosphorus] = useState(food.phosphorus);
  const [potassium, setPotasium] = useState(food.potassium);
  const [sodium, setSodium] = useState(food.sodium);

  const count = useSelector((state) => state.foodCount);

  const handlePressModal = () => {
    setIsOpen(!isOpen);
    setInputMeal('100');
    setCalorie(food.calorie);
    setProtein(food.protein);
    setPhosphorus(food.phosphorus);
    setPotasium(food.potassium);
    setSodium(food.sodium);
  };

  function FoodCalc(inputMeal) {
    if (inputMeal <= 1000) {
      let gram = 0.01 * inputMeal;
      setCalorie((food.calorie * gram).toFixed(2));
      setProtein((food.protein * gram).toFixed(2));
      setPhosphorus((food.phosphorus * gram).toFixed(2));
      setPotasium((food.potassium * gram).toFixed(2));
      setSodium((food.sodium * gram).toFixed(2));
    }
  }

  function handleChangeInput(inputMeal) {
    inputMeal > 1000 ? setInputMeal('1000') : setInputMeal(inputMeal);
    FoodCalc(inputMeal);
    setChange(true);
  }

  function handlePressAdd() {
    if (basketFoods.filter(({foodId}) => food.foodId === foodId).length) {
      Alert.alert('음식 추가 오류', '이미 추가된 음식입니다.');
      handlePressModal();
      return;
    }

    dispatch(changeCount(count + 1));
    dispatch(
      addBasket({
        foodId: food.foodId,
        foodAmount: inputMeal,
        calorie,
        protein,
        phosphorus,
        potassium,
        sodium,
        foodName: food.foodName,
      }),
    );
    console.log(food.foodId, ': ', food.foodName);
    handlePressModal();
  }

  const handlePressSave = () => {
    dispatch(saveFood(food.id));
    handlePressModal();
  };

  const handlePressDelete = () => {
    dispatch(deleteFood(food.id));
    handlePressModal();
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handlePressModal();
      }}
      style={FoodInformationModalStyles.itemContainer({
        isAlreadyEat: food.isAlreadyEat,
        mealTime: food.mealTime,
      })}>
      <View style={FoodInformationModalStyles.itemView}>
        <Text style={FoodInformationModalStyles.foodName}>
          {food.foodName}
          <Text>
            {food.mealTime &&
              (food.mealTime === 1
                ? '(아침)'
                : food.mealTime === 2
                ? '(점심)'
                : food.mealTime === 3
                ? '(저녁)'
                : food.mealTime === 4
                ? '(간식)'
                : '')}
          </Text>
        </Text>

        <Modal
          visible={isOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={handlePressModal}>
          <View style={FoodInformationModalStyles.modalViewContainer}>
            <View style={FoodInformationModalStyles.modalView}>
              <View style={FoodInformationModalStyles.textContainer}>
                <View>
                  <Text style={FoodInformationModalStyles.foodTitle}>
                    {food.foodName}
                  </Text>
                </View>
                <View
                  style={{
                    width: 100,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: 'black',
                    borderRadius: 5,
                    height: 50,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    fontSize: 16,
                    marginBottom: '1%',
                    marginRight: '5%',
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    style={{
                      width: 95,
                      fontSize: 17,
                    }}
                    keyboardType="numeric"
                    //placeholder="100"
                    placeholderTextColor="black"
                    value={String(inputMeal)}
                    onChangeText={(value) => {
                      handleChangeInput(value.replace(/[^0-9]/g, ''));
                    }}
                  />

                  <Text style={{fontSize: 24}}>g</Text>
                </View>
                <Text
                  style={{
                    ...HomeScreenStyles.textDetail,
                    ...HomeScreenStyles.textInterval,
                  }}>
                  열량 ({change ? calorie : food.calorie} kcal / {goal?.calorie}{' '}
                  kcal)
                </Text>
                <NuturitionBarChart
                  nuturition={change ? calorie : food.calorie}
                  goal={goal?.calorie}
                />

                <Text
                  style={{
                    ...HomeScreenStyles.textDetail,
                    ...HomeScreenStyles.textInterval,
                  }}>
                  단백질 ({change ? protein : food.protein} g / {goal?.protein}{' '}
                  g)
                </Text>
                <NuturitionBarChart
                  nuturition={change ? protein : food.protein}
                  goal={goal?.protein}
                />
                <Text
                  style={{
                    ...HomeScreenStyles.textDetail,
                    ...HomeScreenStyles.textInterval,
                  }}>
                  인 ({change ? phosphorus : food.phosphorus} mg /{' '}
                  {goal?.phosphorus} mg)
                </Text>
                <NuturitionBarChart
                  nuturition={change ? phosphorus : food.phosphorus}
                  goal={goal?.phosphorus}
                />
                <Text
                  style={{
                    ...HomeScreenStyles.textDetail,
                    ...HomeScreenStyles.textInterval,
                  }}>
                  칼륨 ({change ? potassium : food.potassium} mg /{' '}
                  {goal?.potassium} mg)
                </Text>
                <NuturitionBarChart
                  nuturition={change ? potassium : food.potassium}
                  goal={goal?.potassium}
                />
                <Text
                  style={{
                    ...HomeScreenStyles.textDetail,
                    ...HomeScreenStyles.textInterval,
                  }}>
                  나트륨 ({change ? sodium : food.sodium} mg / {goal?.sodium}{' '}
                  mg)
                </Text>
                <NuturitionBarChart
                  nuturition={change ? sodium : food.sodium}
                  goal={goal?.sodium}
                />
              </View>

              <View style={FoodInformationModalStyles.modalButtonContainer}>
                <Button title="추가" onPress={() => handlePressAdd()} />
                <Button title="닫기" onPress={() => handlePressModal()} />
                {type === 'stored' ? (
                  <Button title="삭제" onPress={() => handlePressDelete()} />
                ) : (
                  <TouchableHighlight
                    style={FoodInformationModalStyles.openButton}
                    onPress={() => {
                      handlePressSave();
                    }}>
                    <Text style={FoodInformationModalStyles.openButtonText}>
                      찜하기
                    </Text>
                  </TouchableHighlight>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
}
