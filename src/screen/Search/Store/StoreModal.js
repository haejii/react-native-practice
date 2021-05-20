import React, {useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteStoreFoods} from '../../../actions';
import NuturitionBarChart from '../../../moduleComponent/NuturitionBarChart';
import {
  DietModalStyles,
  FoodInformationModalStyles,
} from '../../../style/styles';
import FoodInformationModal from '../firstTab/FoodInformationModal';

export default function StoreModal({mealTime, foods, nutrition, goal}) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const foodId = foods[0].foodStoredRecordId;

  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePressDelete = () => {
    console.log('1', foodId);
    Alert.alert('찜 삭제', `${mealTime} 을 삭제하시겠습니까?`, [
      {
        text: '지우기',
        onPress: () => {
          // dispatch(requestRemoveFood(foodIntakeRecordTypeId, foodId, date));
          dispatch(deleteStoreFoods(foodId));
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
            backgroundColor: 'skyblue',
            width: '100%',
            padding: 10,
            borderRadius: 10,
            marginBottom: 5,
          }}>
          <Text>{mealTime}</Text>
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
                  title="추가"
                  onPress={() => setIsOpen2(true)}
                />
                <Button
                  textStyle={{color: 'white'}}
                  title="닫기"
                  onPress={() => handlePressModal()}
                />
                <Button
                  textStyle={{color: 'white'}}
                  title="삭제"
                  onPress={() => handlePressDelete()}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isOpen2}
        animationType="slide"
        transparent={true}
        onRequestClose={handlePressModal}>
        <View style={DietModalStyles.modalViewContainer}>
          <View style={DietModalStyles.modalView}>
            <Button
              textStyle={{color: 'white'}}
              title="아침"
              onPress={() => {}}
            />
            <Button
              textStyle={{color: 'white'}}
              title="점심"
              onPress={() => {}}
            />
            <Button
              textStyle={{color: 'white'}}
              title="저녁"
              onPress={() => {}}
            />
            <Button
              textStyle={{color: 'white'}}
              title="간식"
              onPress={() => {}}
            />
            <Button
              textStyle={{color: 'white'}}
              title="취소"
              onPress={() => setIsOpen2(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
