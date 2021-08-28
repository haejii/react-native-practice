import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import NuturitionBarChart from '../../moduleComponent/NuturitionBarChart';
import {FoodInformationModalStyles, DietModalStyles} from '../../style/styles';
import {useDispatch} from 'react-redux';
import {requestRemoveFoodsByMealTime} from '../../actions';

export default function DietModal({mealTime, foods, nutrition, goal, date}) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePressDeleteMeal = (foodIntakeRecordId) => {
    Alert.alert('전체 삭제', `${mealTime} 메뉴를 전부 삭제하시겠습니까?`, [
      {
        text: '지우기',
        onPress: () => {
          // dispatch(requestRemoveFood(foodIntakeRecordTypeId, foodId, date));
          dispatch(requestRemoveFoodsByMealTime(foodIntakeRecordId, date));
        },
      },
      {text: '취소'},
    ]);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handlePressModal()}>
        <View
          style={{
            borderWidth: 1,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'white',
            backgroundColor: '#ec7079',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: 'white'}}>
            영양소 보기
          </Text>
        </View>
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
                <Text style={DietModalStyles.foodTitle}>{mealTime}</Text>
              </View>

              <View style={{flex: 3}}>
                <ScrollView>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        width: '90%',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: 'white',
                        backgroundColor: 'pink',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        식사 메뉴
                      </Text>
                    </View>

                    <View style={{width: '80%', margin: 10}}>
                      {foods.map((food, i) => (
                        <Text style={{fontSize: 16}} key={i}>
                          - {food.foodName}
                        </Text>
                      ))}
                    </View>
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        width: '90%',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: 'white',
                        backgroundColor: 'pink',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        섭취 열량
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      margin: 10,
                    }}>
                    <Text>
                      열량 ({nutrition.calorie} kcal / {goal?.calorie} kcal)
                    </Text>
                    <NuturitionBarChart
                      nuturition={nutrition.calorie}
                      goal={goal?.calorie}
                    />

                    <Text>
                      단백질 ({nutrition.protein} g/ {goal?.protein} g)
                    </Text>
                    <NuturitionBarChart
                      nuturition={nutrition.protein}
                      goal={goal?.protein}
                    />

                    <Text>
                      인 ({nutrition.phosphorus} mg / {goal?.phosphorus} mg)
                    </Text>
                    <NuturitionBarChart
                      nuturition={nutrition.phosphorus}
                      goal={goal?.phosphorus}
                    />

                    <Text>
                      칼륨 ({nutrition.potassium} mg / {goal?.potassium} mg)
                    </Text>

                    <NuturitionBarChart
                      nuturition={nutrition.potassium}
                      goal={goal?.potassium}
                    />

                    <Text>
                      나트륨 ({nutrition.sodium} mg / {goal?.sodium} mg)
                    </Text>
                    <NuturitionBarChart
                      nuturition={nutrition.sodium}
                      goal={goal?.sodium}
                    />
                  </View>
                </ScrollView>
              </View>

              <View style={DietModalStyles.modalButtonContainer}>
                <Button
                  textStyle={{color: 'white'}}
                  title="전체 삭제"
                  onPress={() =>
                    handlePressDeleteMeal(foods[0]?.foodIntakeRecordId)
                  }
                />
                <Button
                  textStyle={{color: 'white'}}
                  title="닫기"
                  onPress={() => handlePressModal()}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
