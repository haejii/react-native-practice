import React from 'react';
import {View, ScrollView, Text, Modal, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MakeStoreFood from '../Store/MakeStoreFoodScreen';
import ShowStore from '../Store/ShowStoreScreen';
import NativeButton from 'apsl-react-native-button';
import {useState} from 'react/cjs/react.development';
import {FoodInformationModalStyles} from '../../../style/styles';

export default function MyRecipeScreen() {
  const storedFood = useSelector((state) => state.storedFood);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const handlePressMakeRecipe = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 2, marginTop: 10, marginLeft: 5, marginRight: 5}}>
          <ShowStore />
        </View>

        <NativeButton onPress={() => handlePressMakeRecipe()}>
          나만의 레시피 만들기
        </NativeButton>
      </View>

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handlePressMakeRecipe}>
        <View style={FoodInformationModalStyles.modalViewContainer}>
          <View
            style={{
              flex: 0,
              backgroundColor: 'white',
              borderRadius: 20,
              borderWidth: 1,
              width: '90%',
              height: Platform.OS === 'ios' ? '20%' : '20%',
            }}>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text>식사이름</Text>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                style={{
                  width: '60%',
                  backgroundColor: 'white',
                  height: 50,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  marginRight: '5%',
                }}
                placeholder="저장할 식사 이름을 입력해주세요."
                autoCapitalize="none"
                value={name}
                onChangeText={(value) => setName(value)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <NativeButton
                style={{width: '20%', height: 20}}
                onPress={() => handlePressMakeRecipe()}>
                취소
              </NativeButton>
              <NativeButton
                style={{width: '20%', height: 20}}
                onPress={() => handlePressMakeRecipe()}>
                저장
              </NativeButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
