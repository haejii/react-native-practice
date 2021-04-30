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
import {DialysisScreenStyle} from '../../../style/styles';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import NativeButton from 'apsl-react-native-button';
import {useDispatch, useSelector} from 'react-redux';
import {
  addGeneralDialysis,
  changeDialysis,
  setError,
  fetchMemos,
  clearDialysis,
} from '../../../actions';
import {useEffect} from 'react/cjs/react.development';
import DateTimePicker from '@react-native-community/datetimepicker';
import SplashScreen from '../../SplashScreen';
import errors from '../../../utils/errors';

export default function Machinedialysis({
  navigation,
  route: {
    params: {date},
  },
}) {
  const dispatch = useDispatch();

  const kidneyType = useSelector((state) => state.user.kidneyType);
  const error = useSelector((state) => state.error);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [exchangeTime, setExchangeTime] = useState(new Date(date));
  const [hour, setHour] = useState(exchangeTime.getHours());
  const [min, setMin] = useState(exchangeTime.getMinutes());

  const dialysis = useSelector((state) => state.dialysis);
  const dialysisType = 1;

  let time = `${hour}시 ${min}분`;

  function handleChangDialysis(name, value) {
    dispatch(changeDialysis(name, value));
  }

  const handlePressShowImagePicker = () => {
    Alert.alert('선택해주세요', '', [
      {
        text: '사진 찍기',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '갤러리에서 불러오기',
        onPress: () => {
          launchImageLibrary({}, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              Alert.alert(response.customButton);
            } else {
              setPhoto(response);
            }
          });
        },
        style: 'cancel',
      },
      {
        text: '닫기',
        style: 'cancel',
      },
    ]);
  };

  const AddBtn = () => {
    if (dialysis.exchangeTime === null) {
      return Alert.alert('기입확인', '기입하지 않은 부분 존재');
    } else {
      dialysis.exchangeTime = exchangeTime;
      dispatch(addGeneralDialysis(dialysis, date, dialysisType, photo));
    }
  };

  useEffect(() => {
    if (error.status && error.name === errors.ADD_DIALYSIS_MEMOS_FAILED) {
      Alert.alert('메모 작성 실패', errors.message);
      dispatch(setError());
    }

    if (error.status && error.name === errors.ADD_DIALYSIS_MEMOS_ERROR) {
      Alert.alert(
        '오류 발생',
        '메모 작성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
      );
      dispatch(setError());
    }

    if (!error.status && error.name === errors.LOADING) {
      // Alert.alert('로딩 중', '사진이 업로드될때까지 잠시 기다려주세요...');
    }

    if (!error.status && error.name === errors.ADD_DIALYSIS_MEMOS_SUCCESS) {
      navigation.navigate('Calendar');
      dispatch(fetchMemos(date, kidneyType));
      dispatch(clearDialysis());
      dispatch(setError());
    }
  }, [error]);

  if (!error.status && error.name === errors.LOADING) {
    return <SplashScreen />;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setExchangeTime(currentDate);
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
          <Text>{date}</Text>
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
                onPress={showTimepicker}>
                {time}
              </NativeButton>
            </View>
            <View style={DialysisScreenStyle.basicView}>
              <Text>주입액 농도: </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(dialysis.injectionConcentration)}
                onChangeText={(value) =>
                  handleChangDialysis('injectionConcentration', value)
                }
              />
              <Text>%</Text>
            </View>
            <View style={DialysisScreenStyle.basicView}>
              <Text>주입량 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(dialysis.injectionAmount)}
                onChangeText={(value) =>
                  handleChangDialysis('injectionAmount', value)
                }
              />
              <Text>g</Text>
            </View>

            <View style={DialysisScreenStyle.basicView}>
              <Text>배액량 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(dialysis.drainage)}
                onChangeText={(value) => handleChangDialysis('drainage', value)}
              />
              <Text>g</Text>
            </View>

            <View style={DialysisScreenStyle.basicView}>
              <Text>제수량 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(dialysis.dehydration)}
                onChangeText={(value) =>
                  handleChangDialysis('dehydration', value)
                }
              />
              <Text>g</Text>
            </View>

            <View style={DialysisScreenStyle.basicView}>
              <Text>몸무게 : </Text>
              <TextInput
                style={DialysisScreenStyle.basicTextInput}
                keyboardType="numeric"
                value={String(dialysis.weight)}
                onChangeText={(value) => handleChangDialysis('weight', value)}
              />
              <Text>kg</Text>
            </View>

            <View style={DialysisScreenStyle.basicView}>
              <Text>부종 : </Text>
              <NativeButton
                style={DialysisScreenStyle.buttonContent(dialysis.edema)}
                onPress={() => {
                  handleChangDialysis('edema', '1');
                  console.log(dialysis.edema);
                }}>
                O
              </NativeButton>
              <NativeButton
                style={DialysisScreenStyle.buttonContent2(dialysis.edema)}
                onPress={() => {
                  handleChangDialysis('edema', '2');
                  console.log(dialysis.edema);
                }}>
                X
              </NativeButton>
            </View>

            <View style={{marginTop: 30, marginBottom: 30}}>
              <Text>갤러리</Text>

              <TouchableOpacity
                style={{
                  width: '80%',
                  borderRadius: 20,
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'skyblue',
                }}
                onPress={() => handlePressShowImagePicker()}>
                {photo ? (
                  <Image
                    source={{
                      uri: photo && photo.uri ? photo.uri : photo,
                    }}
                    style={{
                      resizeMode: 'stretch',
                      borderRadius: 20,
                      width: '100%',
                      height: 300,
                    }}
                  />
                ) : (
                  <Text
                    style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
                    사진 첨부하기
                  </Text>
                )}
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
                value={String(dialysis.memo)}
                onChangeText={(value) => handleChangDialysis('memo', value)}
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
            <Button
              title="뒤로가기"
              onPress={() => {
                navigation.navigate('Calendar');
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
