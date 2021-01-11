import React, {useState} from 'react';
import {Modal, Text, View, Button, TouchableOpacity} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

export default function MealModal({food, onPress}) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePressModal = () => {
    setIsOpen(!isOpen);
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
                  }}>
                  <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
}
