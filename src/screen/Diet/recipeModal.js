import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NuturitionBarChart from '../../moduleComponent/NuturitionBarChart';
import {DietModalStyles, HomeScreenStyles} from '../../style/styles';

export default function RecipeModal({food}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const goal = useSelector((state) => state.user.goal);
  const [inputMeal, setInputMeal] = useState('100');

  const handlePressModal = () => {
    food?.recipe !== null || food?.tip !== null
      ? setIsOpen(!isOpen)
      : setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          height: 40,
          width: 60,
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: 'skyblue',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 5,
        }}
        onPress={() => handlePressModal()}>
        <Text style={{fontSize: 10, fontWeight: 'bold'}}>레시피보기</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handlePressModal}>
        <View style={DietModalStyles.modalViewContainer}>
          <View style={DietModalStyles.modalView}>
            <View style={DietModalStyles.modalContent}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={DietModalStyles.foodTitle}>{food.foodName}</Text>
              </View>

              {food?.tip ? (
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {food.tip}
                  </Text>
                </View>
              ) : null}

              {food?.recipe ? (
                <View>
                  <Text>레시피 보기</Text>
                  <View
                    style={{
                      width: '90%',
                      borderWidth: 1,
                      borderRadius: 15,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {food.recipe}
                    </Text>
                  </View>
                </View>
              ) : null}

              <Button
                textStyle={{color: 'white'}}
                title="닫기"
                onPress={() => handlePressModal()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
