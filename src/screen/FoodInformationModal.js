import React, {useState} from 'react';
import {Modal, Text, View, Button, TouchableOpacity, Alert} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addMeal, addNuturition, deleteFood, saveFood} from '../actions';
import {FoodInformationModalStyles} from '../style/styles';

export default function FoodInformationModal({food, onPress, type}) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePressAdd = () => {
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
  };

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
      style={FoodInformationModalStyles.itemContainer}>
      <View style={FoodInformationModalStyles.itemView}>
        <Text style={FoodInformationModalStyles.foodName}>{food.name}</Text>

        <Modal
          visible={isOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={handlePressModal}>
          <View style={FoodInformationModalStyles.modalViewContainer}>
            <View style={FoodInformationModalStyles.modalView}>
              <View style={FoodInformationModalStyles.textContainer}>
                <Text style={FoodInformationModalStyles.foodTitle}>
                  {food.name}
                </Text>
                <Text style={FoodInformationModalStyles.nuturitionText}>
                  칼로리: {food.calorie} kcal
                </Text>
                <Text style={FoodInformationModalStyles.nuturitionText}>
                  탄수화물: {food.carbohydrate} g
                </Text>
                <Text style={FoodInformationModalStyles.nuturitionText}>
                  단백질: {food.protein} g
                </Text>
                <Text style={FoodInformationModalStyles.nuturitionText}>
                  지방: {food.fat} g
                </Text>
                <Text style={FoodInformationModalStyles.nuturitionText}>
                  나트륨: {food.sodium} mg
                </Text>
                <Text style={FoodInformationModalStyles.nuturitionText}>
                  칼슘: {food.calcium} mg
                </Text>
                <Text style={FoodInformationModalStyles.nuturitionText}>
                  칼륨: {food.potassium} mg
                </Text>
                <Text style={FoodInformationModalStyles.nuturitionText}>
                  철: {food.iron} mg
                </Text>
                <Text style={FoodInformationModalStyles.nuturitionText}>
                  인: {food.phosphorus} mg
                </Text>
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
