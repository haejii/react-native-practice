import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addFood, addMeal, addNuturition, saveFood} from '../actions';

export default function FoodInformationModal({food, onPress}) {
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

    // dispatch(addFood(food.id));
    // dispatch(addNuturition(food));
  };

  const handlePressSave = () => {
    dispatch(saveFood(food.id));
  };

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
        <Text style={{fontSize: 22, color: 'white'}}>{food.name}</Text>

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
                  style={{fontWeight: 'bold', fontSize: 24, marginBottom: 20}}>
                  {food.name}
                </Text>
                <Text style={{fontSize: 20}}>칼로리: {food.calorie} kcal</Text>
                <Text style={{fontSize: 20}}>
                  탄수화물: {food.carbohydrate} g
                </Text>
                <Text style={{fontSize: 20}}>단백질: {food.protein} g</Text>
                <Text style={{fontSize: 20}}>지방: {food.fat} g</Text>
                <Text style={{fontSize: 20}}>나트륨: {food.sodium} mg</Text>
                <Text style={{fontSize: 20}}>칼슘: {food.calcium} mg</Text>
                <Text style={{fontSize: 20}}>칼륨: {food.potassium} mg</Text>
                <Text style={{fontSize: 20}}>철: {food.iron} mg</Text>
                <Text style={{fontSize: 20}}>인: {food.phosphorus} mg</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '80%',
                }}>
                <Button title="추가" onPress={() => handlePressAdd()} />
                <Button title="닫기" onPress={() => handlePressModal()} />
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={() => {
                    handlePressModal();
                    handlePressSave();
                  }}>
                  <Text style={styles.textStyle}>찜하기</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );

  // const [modalVisible, setModalVisible] = useState(false);

  // return (
  //   <View style={styles.centeredView}>
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => {
  //         alert('Modal has been closed.');
  //       }}>
  //       <View style={styles.centeredView}>
  //         <View style={styles.modalView}>
  //           <Text style={styles.modalText}>Hello World!</Text>

  //           <TouchableHighlight
  //             style={{...styles.openButton, backgroundColor: '#2196F3'}}
  //             onPress={() => {
  //               setModalVisible(!modalVisible);
  //             }}>
  //             <Text style={styles.textStyle}>Hide Modal</Text>
  //           </TouchableHighlight>
  //         </View>
  //       </View>
  //     </Modal>

  //     <TouchableHighlight
  //       style={styles.openButton}
  //       onPress={() => {
  //         setModalVisible(true);
  //       }}>
  //       <Text style={styles.textStyle}>Show Modal</Text>
  //     </TouchableHighlight>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
