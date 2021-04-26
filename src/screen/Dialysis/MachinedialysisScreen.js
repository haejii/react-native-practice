import {View, Text, Image, Platform} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {DialysisScreenStyle} from '../../style/styles';
import ImagePicker from 'react-native-image-picker';
import no_user from '../../../assets/image/no_user.png';
import NativeButton from 'apsl-react-native-button';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MachineDialysis() {
  const noUserImage = Image.resolveAssetSource(no_user).uri;

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1); //교환시간 월
  const [day, setDay] = useState(new Date().getDate()); //교환시간 일
  const [hour, setHour] = useState(new Date().getHours());
  const [min, setMin] = useState(new Date().getMinutes());
  const [injectionConcentration, setInjectionConcentration] = useState(''); //주입액농도
  const [injectionVolum, setInjectionVolum] = useState(''); //주입량
  const [chestVolum, setChestVolum] = useState(''); //배액량
  const [weight, setWeight] = useState(''); //몸무게
  const [photo, setPhoto] = useState(noUserImage);

  let today = ` ${month}월 ${day}일`;
  let time = `${hour}시 ${min}분`;
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setMonth(currentDate.getMonth() + 1);
    setDay(currentDate.getDate());
    console.log(selectedDate);
    console.log(currentDate.getHours());
    setHour(currentDate.getHours());
    setMin(currentDate.getMinutes());
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
            <View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
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
                  width: '40%',
                  height: 100,
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
