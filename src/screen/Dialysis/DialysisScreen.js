import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useState} from 'react/cjs/react.development';
import {DialysisScreenStyle, JoinScreenStyles} from '../../style/styles';
import ImagePicker from 'react-native-image-picker';
import no_user from '../../../assets/image/no_user.png';
import NativeButton from 'apsl-react-native-button';

const Tab = createMaterialTopTabNavigator();

function GenetalDialysis() {
  const noUserImage = Image.resolveAssetSource(no_user).uri;

  const [count, setCount] = useState(''); // 차수
  const [month, setMonth] = useState(''); //교환시간 월
  const [day, setDay] = useState(''); //교환시간 일
  const [injectionConcentration, setInjectionConcentration] = useState(''); //주입액농도
  const [injectionVolum, setInjectionVolum] = useState(''); //주입량
  const [chestVolum, setChestVolum] = useState(''); //배액량
  const [divisor, setDivisor] = useState(''); //제수량
  const [weight, setWeight] = useState(''); //몸무게
  const [photo, setPhoto] = useState(noUserImage);

  const addImage = () => {
    ImagePicker.launchCamera(
      {
        title: 'Chooser your phote',
      },
      (response) => {
        setPhoto(response.uri);
      },
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            margin: 20,
            borderColor: 'red',
            borderWidth: 2,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 25,
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            총 제수량 차트
          </Text>
        </View>
        <ScrollView>
          <View style={{justifyContent: 'center', marginLeft: 20}}>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
              <TextInput
                style={{
                  width: '10%',
                  backgroundColor: 'white',
                  height: 35,
                  paddingHorizontal: 10,
                  fontSize: 10,
                  fontWeight: 'bold',
                  marginBottom: '1%',
                  marginRight: '5%',
                  borderWidth: 1,
                  borderColor: 'blue',
                }}
                keyboardType="numeric"
                value={String(count)}
                onChangeText={(value) => setCount(value)}
              />
              <Text>차</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
              <Text>교환시간 : </Text>
              <TextInput
                style={{
                  width: '10%',
                  backgroundColor: 'white',
                  height: 50,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  marginBottom: '1%',
                  marginRight: '5%',
                  borderBottomWidth: 2,
                  borderColor: 'blue',
                }}
                keyboardType="numeric"
                value={String(month)}
                onChangeText={(value) => setMonth(value)}
              />
              <Text>월</Text>
              <TextInput
                style={{
                  width: '10%',
                  backgroundColor: 'white',
                  height: 50,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  marginBottom: '1%',
                  marginRight: '5%',
                  borderBottomWidth: 2,
                  borderColor: 'blue',
                }}
                keyboardType="numeric"
                value={String(day)}
                onChangeText={(value) => setDay(value)}
              />
              <Text>일 &nbsp;&nbsp;오전/오후</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
              <Text>주입액 농도: </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(injectionConcentration)}
                onChangeText={(value) => setInjectionConcentration(value)}
              />
              <Text>%</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
              <Text>주입량 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(injectionVolum)}
                onChangeText={(value) => setInjectionVolum(value)}
              />
              <Text>g</Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
              <Text>배액량 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(chestVolum)}
                onChangeText={(value) => setChestVolum(value)}
              />
              <Text>g</Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
              <Text>제수량 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(divisor)}
                onChangeText={(value) => setDivisor(value)}
              />
              <Text>g</Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
              <Text>몸무게 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(weight)}
                onChangeText={(value) => setWeight(value)}
              />
              <Text>g</Text>
            </View>
            <View>
              <Text>갤러리</Text>

              <Image
                source={{uri: photo}}
                style={{
                  width: '100%',
                  height: 200,
                }}
              />
              <NativeButton
                style={{
                  margin: 10,
                }}
                onPress={() => {
                  console.log('추가하기 버튼 클릭됨');
                  addImage();
                }}>
                추가하기
              </NativeButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function MachineDialysis() {
  return (
    <View>
      <Text>기계복막투석</Text>
    </View>
  );
}

export default function DialysisScreen() {
  return (
    <Tab.Navigator initialRouteName="GenetalDialysis">
      <Tab.Screen
        name="GenetalDialysis"
        component={GenetalDialysis}
        options={{tabBarLabel: '일반복막투석'}}
      />
      <Tab.Screen
        name="MachineDialysis"
        component={MachineDialysis}
        options={{tabBarLabel: '기계복막투석'}}
      />
    </Tab.Navigator>
  );
}
