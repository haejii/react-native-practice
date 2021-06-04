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

export default function RecommendModal({food}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const goal = useSelector((state) => state.user.goal);
  const [inputMeal, setInputMeal] = useState('100');

  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  function handleChangeInput(inputValue) {
    inputValue > 1000 ? setInputMeal('1000') : setInputMeal(inputValue);
  }
  return (
    <View>
      <TouchableOpacity
        style={{
          height: 40,
          width: 60,
          borderWidth: 1,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          borderColor: 'black',
          backgroundColor: 'pink',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 5,
        }}
        onPress={() => handlePressModal()}>
        <Text style={{fontSize: 10, fontWeight: 'bold'}}>자세히보기</Text>
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
                  value={String(food.customAmount)}
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
                열량 ({+food.calorie} kcal / {goal?.calorie} kcal)
              </Text>
              <NuturitionBarChart
                nuturition={food.calorie}
                goal={goal?.calorie}
              />

              <Text
                style={{
                  ...HomeScreenStyles.textDetail,
                  ...HomeScreenStyles.textInterval,
                }}>
                단백질 ({+food.protein} g / {goal?.protein} g)
              </Text>
              <NuturitionBarChart
                nuturition={food.protein}
                goal={goal?.protein}
              />
              <Text
                style={{
                  ...HomeScreenStyles.textDetail,
                  ...HomeScreenStyles.textInterval,
                }}>
                인 ({+food.phosphorus} mg / {goal?.phosphorus} mg)
              </Text>
              <NuturitionBarChart
                nuturition={food.phosphorus}
                goal={goal?.phosphorus}
              />
              <Text
                style={{
                  ...HomeScreenStyles.textDetail,
                  ...HomeScreenStyles.textInterval,
                }}>
                칼륨 ({+food.potassium}
                mg / {goal?.potassium} mg)
              </Text>
              <NuturitionBarChart
                nuturition={+food.potassium}
                goal={goal?.potassium}
              />
              <Text
                style={{
                  ...HomeScreenStyles.textDetail,
                  ...HomeScreenStyles.textInterval,
                }}>
                나트륨 ({+food.sodium} mg / {goal?.sodium} mg)
              </Text>
              <NuturitionBarChart
                nuturition={food.sodium}
                goal={goal?.sodium}
              />

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
