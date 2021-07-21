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
import {getFormattedDate} from '../../../utils/functions';

export default function Machinedialysis2({navigation}) {
  const dispatch = useDispatch();

  const kidneyType = useSelector((state) => state.user.kidneyType);
  const error = useSelector((state) => state.error);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [exchangeTime, setExchangeTime] = useState(new Date('2021-07-12'));
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [today, setToday] = useState(date.getDate());
  const [hour, setHour] = useState(exchangeTime.getHours());
  const [min, setMin] = useState(exchangeTime.getMinutes());

  const [btn, setBtn] = useState(1);

  const dialysis = useSelector((state) => state.dialysis);
  let time = `${hour}시 ${min}분`;
  let day = `${month + 1}월 ${today}일`;

  const AddBtn = () => {
    if (dialysis.exchangeTime === null) {
      return Alert.alert('기입확인', '기입하지 않은 부분 존재');
    } else {
      if (btn === 1) {
        dialysis.exchangeTime = exchangeTime;
        const formattedDate = getFormattedDate(date);
        console.log('exchnge : ', dialysis.exchangeTime);
        console.log('formattdate : ', formattedDate);
        dispatch(addGeneralDialysis(dialysis, formattedDate, 1, photo));
      } else {
        dialysis.exchangeTime = exchangeTime;
        dialysis.degree = 0;
        dialysis.bloodPressure = 0;
        dialysis.bloodSugar = 0;
        dialysis.injectionConcentration = 0;
        const formattedDate = getFormattedDate(date);
        console.log('exchnge : ', dialysis.exchangeTime);
        console.log('formattdate : ', formattedDate);
        dispatch(addGeneralDialysis(dialysis, formattedDate, 2, photo));
      }
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
      navigation.navigate('GeneralDialysis');
      dispatch(fetchMemos(date, kidneyType));
      dispatch(clearDialysis());
      dispatch(setError());
    }
  }, [error]);

  if (!error.status && error.name === errors.LOADING) {
    return <SplashScreen />;
  }

  // Change TextInput

  function handleChangDialysis(name, value) {
    dispatch(changeDialysis(name, typeof value === 'number' ? +value : value));
    console.log(dialysis);
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setExchangeTime(currentDate);
    setHour(currentDate.getHours());
    setMin(currentDate.getMinutes());
    setMonth(currentDate.getMonth());
    setToday(currentDate.getDate());

    const formattedSelectedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
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
  // a:question
  const a = [
    {
      content: String(dialysis.injectionAmount),
      explain: '주입량(g)을 숫자로 입력해주세요',
      name: 'injectionAmount',
    },
    {
      content: String(dialysis.drainage),
      explain: '배액량(g)을 숫자로 입력해주세요',
      name: 'drainage',
    },
    {
      content: String(dialysis.dehydration),
      explain: '제수량(g)을 숫자로 입력해주세요',
      name: 'dehydration',
    },
    {
      content: String(dialysis.weight),
      explain: '몸무게를 측정하셨나요?',
      name: 'weight',
    },
  ];

  // b:question
  const b = [
    {
      content: String(dialysis.injectionAmount),
      explain: '주입량(g)을 숫자로 입력해주세요',
      name: 'injectionAmount',
    },
    {
      content: String(dialysis.drainage),
      explain: '배액량(g)을 숫자로 입력해주세요',
      name: 'drainage',
    },
    {
      content: String(dialysis.dehydration),
      explain: '제수량(g)을 숫자로 입력해주세요',
      name: 'dehydration',
    },
    {
      content: String(dialysis.weight),
      explain: '몸무게를 측정하셨나요?',
      name: 'weight',
    },
    {
      content: String(dialysis.bloodPressure),
      explain: '혈압을 측정하셨나요?',
      name: 'bloodPressure',
    },
    {
      content: String(dialysis.bloodSugar),
      explain: '혈당을 측정하셨나요?',
      name: 'bloodSugar',
    },
  ];

  return (
    <View style={{backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{margin: 20, flex: 1}}>
          <Text style={{fontSize: 20}}>투석일지 작성</Text>
        </View>
        <View
          style={{
            marginLeft: 10,
            marginTop: 10,
            alignContent: 'center',
            justifyContent: 'center',
            flex: 6,
          }}>
          <View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text>복막투석을 선택해주세요. </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <NativeButton
                style={{
                  width: 150,
                  marginRight: 15,
                  backgroundColor: btn === 1 ? 'skyblue' : 'white',
                }}
                onPress={() => setBtn(1)}>
                일반 복막투석
              </NativeButton>
              <NativeButton
                style={{
                  width: 150,
                  backgroundColor: btn === 2 ? 'skyblue' : 'white',
                }}
                onPress={() => setBtn(2)}>
                기계 복막 투석
              </NativeButton>
            </View>
          </View>

          <View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text>투석일지 작성 </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <NativeButton
                style={{
                  width: 150,
                  marginRight: 15,
                }}
                onPress={showDatepicker}>
                {day}
              </NativeButton>
              <NativeButton
                style={{
                  width: 150,
                }}
                onPress={showTimepicker}>
                {time}
              </NativeButton>
            </View>
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

          {btn === 1 ? (
            <>
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    marginBottom: 15,
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>
                    {' '}
                    오늘이 몇 번째인지 선택하세요 ({day})
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NativeButton
                    style={{
                      width: 150,
                      marginRight: 15,
                      backgroundColor:
                        dialysis.degree === 1 ? 'skyblue' : 'white',
                    }}
                    onPress={() => handleChangDialysis('degree', 1)}>
                    1차
                  </NativeButton>
                  <NativeButton
                    style={{
                      width: 150,
                      backgroundColor:
                        dialysis.degree === 2 ? 'skyblue' : 'white',
                    }}
                    onPress={() => handleChangDialysis('degree', 2)}>
                    2차
                  </NativeButton>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NativeButton
                    style={{
                      width: 150,
                      marginRight: 15,
                      backgroundColor:
                        dialysis.degree === 3 ? 'skyblue' : 'white',
                    }}
                    onPress={() => handleChangDialysis('degree', 3)}>
                    3차
                  </NativeButton>
                  <NativeButton
                    style={{
                      width: 150,
                      backgroundColor:
                        dialysis.degree === 4 ? 'skyblue' : 'white',
                    }}
                    onPress={() => handleChangDialysis('degree', 4)}>
                    4차
                  </NativeButton>
                </View>
              </View>
              <View>
                <View
                  style={{
                    marginBottom: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>
                    {' '}
                    주입액 농도를 선택하세요.{' '}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NativeButton
                    style={{
                      width: 150,
                      marginRight: 15,
                      backgroundColor:
                        dialysis.injectionConcentration === 1.5
                          ? 'skyblue'
                          : 'white',
                    }}
                    onPress={() =>
                      handleChangDialysis('injectionConcentration', 1.5)
                    }>
                    1.5%
                  </NativeButton>
                  <NativeButton
                    style={{
                      width: 150,
                      backgroundColor:
                        dialysis.injectionConcentration === 2.5
                          ? 'skyblue'
                          : 'white',
                    }}
                    onPress={() =>
                      handleChangDialysis('injectionConcentration', 2.5)
                    }>
                    2.5(2.3)%
                  </NativeButton>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <NativeButton
                    style={{
                      width: 150,
                      marginRight: 15,
                      backgroundColor:
                        dialysis.injectionConcentration === 4.5
                          ? 'skyblue'
                          : 'white',
                    }}
                    onPress={() =>
                      handleChangDialysis('injectionConcentration', 4.5)
                    }>
                    4.25%
                  </NativeButton>
                  <NativeButton
                    style={{
                      width: 150,
                      backgroundColor:
                        dialysis.injectionConcentration === 7.5
                          ? 'skyblue'
                          : 'white',
                    }}
                    onPress={() =>
                      handleChangDialysis('injectionConcentration', 7.5)
                    }>
                    7.5%
                  </NativeButton>
                </View>
              </View>

              {Object.keys(b).map((key, i) => {
                return (
                  <View key={i + 1} style={DialysisScreenStyle.basicView}>
                    <Text
                      style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>
                      {b[key]['explain']}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                        style={DialysisScreenStyle.basicTextInput}
                        keyboardType="numeric"
                        value={b[key]['content']}
                        onChangeText={(value) =>
                          handleChangDialysis(b[key]['name'], value)
                        }
                      />
                    </View>
                  </View>
                );
              })}

              <View style={DialysisScreenStyle.basicView}>
                <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>
                  부종이 있나요?{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
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
                      //console.log(edema);
                    }}>
                    X
                  </NativeButton>
                </View>
              </View>
            </>
          ) : (
            <>
              {Object.keys(a).map((key, i) => {
                return (
                  <View key={i + 1} style={DialysisScreenStyle.basicView}>
                    <Text
                      style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>
                      {a[key]['explain']}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                        style={DialysisScreenStyle.basicTextInput}
                        keyboardType="numeric"
                        value={a[key]['content']}
                        onChangeText={(value) =>
                          handleChangDialysis(a[key]['name'], value)
                        }
                      />
                    </View>
                  </View>
                );
              })}
            </>
          )}

          <View style={DialysisScreenStyle.basicView}>
            <Text>첨부할 사진이 있나요?</Text>
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
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  사진 첨부하기
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={{flex: 3, marginTop: 20}}>
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
          </View>

          <NativeButton
            style={{
              margin: 10,
            }}
            onPress={() => {
              dispatch(clearDialysis());
              AddBtn();
            }}>
            저장하기
          </NativeButton>
        </View>
      </ScrollView>
    </View>
  );
}
