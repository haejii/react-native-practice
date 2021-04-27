import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useState} from 'react/cjs/react.development';
import {DialysisScreenStyle, JoinScreenStyles} from '../../style/styles';
//import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import no_user from '../../../assets/image/no_user.png';
import NativeButton from 'apsl-react-native-button';
import {useDispatch, useSelector} from 'react-redux';
import {requestGeneralDialysis} from '../../actions';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function GeneralDialysis() {
  const noUserImage = Image.resolveAssetSource(no_user).uri;
  const dispatch = useDispatch();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [degree, setDegree] = useState(''); // 차수
  const [month, setMonth] = useState(new Date().getMonth() + 1); //교환시간 월
  const [day, setDay] = useState(new Date().getDate()); //교환시간 일
  const [injectionConcentration, setInjectionConcentration] = useState(''); //주입액농도
  const [injectionAmount, setInjectionAmount] = useState(''); //주입량
  const [drainage, setChestVolum] = useState(''); //배액량
  const [dehydration, setDivisor] = useState(''); //제수량
  const [weight, setWeight] = useState(''); //몸무게
  const [bloodPressure, setBloodPressure] = useState(''); //혈압
  const [bloodSugar, setBloodSugar] = useState(''); //혈당
  const [edema, setEdema] = useState('1'); //부종
  const [memo, setMemo] = useState(''); //메모
  const [photo, setPhoto] = useState(noUserImage);
  const [exchangeTime, setExchangeTime] = useState(new Date());
  const [hour, setHour] = useState(new Date().getHours());
  const [min, setMin] = useState(new Date().getMinutes());

  let today = ` ${month}월 ${day}일`;
  let time = `${hour}시 ${min}분`;

  const addImage = () => {
    ImagePicker.launchImageLibrary(
      {
        //title: 'Chooser your phote',
      },
      (response) => {
        setPhoto(response.uri);
      },
    );
  };

  const AddBtn = () => {
    if (
      !injectionConcentration ||
      !injectionAmount ||
      !drainage ||
      !dehydration ||
      !weight
    ) {
      return Alert.alert('기입확인', '기입하지 않은 부분 존재');
    } else {
      console.log('2. action으로 감');
      console.log(
        exchangeTime,
        injectionConcentration,
        injectionAmount,
        drainage,
        dehydration,
        weight,
        bloodPressure,
        bloodSugar,
        edema,
        memo,
      );
      dispatch(
        requestGeneralDialysis(
          exchangeTime,
          injectionConcentration,
          injectionAmount,
          drainage,
          dehydration,
          weight,
          bloodPressure,
          bloodSugar,
          edema,
          memo,
        ),
      );
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setExchangeTime(currentDate);
    setMonth(currentDate.getMonth() + 1);
    setDay(currentDate.getDate());
    setHour(currentDate.getHours());
    setMin(currentDate.getMinutes());

    console.log(exchangeTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
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
                value={String(degree)}
                onChangeText={(value) => setDegree(value)}
              />
              <Text>차</Text>
            </View>
            <View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={exchangeTime}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={DialysisScreenStyle.basicView}>
              <Text>교환시간 : </Text>

              <NativeButton
                style={{backgroundColor: 'white', width: 100}}
                onPress={showDatepicker}>
                {today}
              </NativeButton>

              <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>

              <NativeButton
                style={{backgroundColor: 'white', width: 100}}
                onPress={showTimepicker}>
                {time}
              </NativeButton>
            </View>
            <View style={DialysisScreenStyle.basicView}>
              <Text>주입액 농도: </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(injectionConcentration)}
                onChangeText={(value) => setInjectionConcentration(value)}
              />
              <Text>%</Text>
            </View>
            <View style={DialysisScreenStyle.basicView}>
              <Text>주입량 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(injectionAmount)}
                onChangeText={(value) => setInjectionAmount(value)}
              />
              <Text>g</Text>
            </View>

            <View style={DialysisScreenStyle.basicView}>
              <Text>배액량 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(drainage)}
                onChangeText={(value) => setChestVolum(value)}
              />
              <Text>g</Text>
            </View>

            <View style={DialysisScreenStyle.basicView}>
              <Text>제수량 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(dehydration)}
                onChangeText={(value) => setDivisor(value)}
              />
              <Text>g</Text>
            </View>

            <View style={DialysisScreenStyle.basicView}>
              <Text>몸무게 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(weight)}
                onChangeText={(value) => setWeight(value)}
              />
              <Text>kg</Text>
            </View>
            <View style={DialysisScreenStyle.basicView}>
              <Text>혈압 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(bloodPressure)}
                onChangeText={(value) => setBloodPressure(value)}
              />
              <Text>g</Text>
            </View>

            <View style={DialysisScreenStyle.basicView}>
              <Text>혈당 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(bloodSugar)}
                onChangeText={(value) => setBloodSugar(value)}
              />
              <Text>g</Text>
            </View>

            <View style={DialysisScreenStyle.basicView}>
              <Text>부종 : </Text>
              <NativeButton
                style={DialysisScreenStyle.buttonContent(edema)}
                onPress={() => {
                  setEdema('1');
                  console.log(edema);
                }}>
                O
              </NativeButton>
              <NativeButton
                style={DialysisScreenStyle.buttonContent2(edema)}
                onPress={() => {
                  setEdema('2');
                  console.log(edema);
                }}>
                X
              </NativeButton>
            </View>

            <View style={{marginTop: 30, marginBottom: 30}}>
              <Text>갤러리</Text>

              <TouchableOpacity
                onPress={() => {
                  addImage();
                }}>
                <Image
                  source={{uri: photo}}
                  style={{
                    width: '50%',
                    height: 200,
                  }}
                />
              </TouchableOpacity>
            </View>

            <Text>메모 </Text>
            <View style={DialysisScreenStyle.basicView}>
              <TextInput
                style={{
                  width: '95%',
                  backgroundColor: 'white',
                  height: 100,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  marginBottom: '1%',
                  marginRight: '5%',
                  borderWidth: 1,
                  borderColor: 'black',
                }}
                keyboardType="numeric"
                value={String(memo)}
                onChangeText={(value) => setMemo(value)}
              />
            </View>
            <NativeButton
              style={{
                margin: 10,
              }}
              onPress={() => {
                console.log('1. 추가하기 버튼 클릭됨');
                AddBtn();
              }}>
              추가하기
            </NativeButton>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
