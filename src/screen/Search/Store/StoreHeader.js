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
import NuturitionBarChart from '../../../moduleComponent/NuturitionBarChart';
import {DietModalStyles} from '../../../style/styles';

export default function StoreHeader({storefood, goal}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePressRemove = () => {
    Alert.alert('이 메뉴를 지우겠습니까?', '', [
      {
        text: '지우기',
        onPress: () => {},
      },
      {text: '취소'},
    ]);
  };

  const handlePressAdd = () => {
    setIsOpen2(true);
  };
  return (
    <View>
      {Object.keys(storefood).map((key, i) => {
        const calorie = storefood[key]
          .map((food) => food.calorie)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const protein = storefood[key]
          .map((food) => food.protein)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const phosphorus = storefood[key]
          .map((food) => food.phosphorus)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const potassium = storefood[key]
          .map((food) => food.potassium)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const sodium = storefood[key]
          .map((food) => food.sodium)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        return (
          <View key={i + key}>
            <TouchableOpacity
              style={{
                backgroundColor: 'skyblue',
                width: '100%',
                padding: 10,
                borderRadius: 10,
                marginBottom: 5,
              }}
              onPress={() => handlePressModal()}>
              <Text style={{textAlign: 'center'}}>{key}</Text>

              <Modal
                visible={isOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={handlePressModal}>
                <View style={DietModalStyles.modalViewContainer}>
                  <View style={DietModalStyles.modalView}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>{key}</Text>
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
                            {storefood[key].map((food, i) => (
                              <Text style={{fontSize: 16}} key={i}>
                                - {food.foodName}({food.foodAmount}g)
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
                            열량 ({calorie} kcal / {goal?.calorie} kcal)
                          </Text>
                          <NuturitionBarChart
                            nuturition={calorie}
                            goal={goal?.calorie}
                          />

                          <Text>
                            단백질 ({protein} g/ {goal?.protein} g)
                          </Text>
                          <NuturitionBarChart
                            nuturition={protein}
                            goal={goal?.protein}
                          />

                          <Text>
                            인 ({phosphorus} mg / {goal?.phosphorus} mg)
                          </Text>
                          <NuturitionBarChart
                            nuturition={phosphorus}
                            goal={goal?.phosphorus}
                          />

                          <Text>
                            칼륨 ({potassium} mg / {goal?.potassium} mg)
                          </Text>

                          <NuturitionBarChart
                            nuturition={potassium}
                            goal={goal?.potassium}
                          />

                          <Text>
                            나트륨 ({sodium} mg / {goal?.sodium} mg)
                          </Text>
                          <NuturitionBarChart
                            nuturition={sodium}
                            goal={goal?.sodium}
                          />
                        </View>
                      </ScrollView>
                    </View>

                    <View style={DietModalStyles.modalButtonContainer}>
                      <Button
                        textStyle={{color: 'white'}}
                        title="닫기"
                        onPress={() => handlePressModal()}
                      />
                      <Button
                        textStyle={{color: 'white'}}
                        title="삭제"
                        onPress={() => handlePressRemove()}
                      />
                      <Button
                        textStyle={{color: 'white'}}
                        title="식사추가"
                        onPress={() => handlePressAdd()}
                      />
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
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
