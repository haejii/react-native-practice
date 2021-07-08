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
import errors from '../../../utils/errors';
import DateTimePicker from '@react-native-community/datetimepicker';
import SplashScreen from '../../SplashScreen';

export default function GeneralDialysis2({navigation}) {
  const dispatch = useDispatch();

  const kidneyType = useSelector((state) => state.user.kidneyType);
  const error = useSelector((state) => state.error);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [exchangeTime, setExchangeTime] = useState(new Date());
  const [hour, setHour] = useState(exchangeTime.getHours());
  const [min, setMin] = useState(exchangeTime.getMinutes());
  const [date, setDate] = useState(new Date());
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());

  let today = `${month}월 ${day}일`;
  let formattedToday = `${year}-${month}-${day}`;

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow2(Platform.OS === 'ios');
    setDate(currentDate);
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
    setDay(currentDate.getDate());

    const formattedSelectedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    setShow2(!show2);
  };

  const showMode2 = (currentMode) => {
    setShow2(!show);
    setMode2(currentMode);
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };

  const dialysis = useSelector((state) => state.dialysis);

  const dialysisType = 2;

  const [isLoding, setIsLoding] = useState(true);

  //  if (isLoding) {
  //    dispatch(clearDialysis());
  //    setIsLoding(false);
  //  }

  let time = `${hour}시 ${min}분`;
  function handleChangDialysis(name, value) {
    dispatch(changeDialysis(name, typeof value === 'number' ? +value : value));
    console.log(dialysis);
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
    if (!dialysis.degrees === null) {
      return Alert.alert('기입확인', '기입하지 않은 부분 존재');
    } else {
      dialysis.exchangeTime = exchangeTime;
      //dispatch(addGeneralDialysis(dialysis, date, dialysisType, photo));
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
      // dispatch(fetchMemos(date, kidneyType));
      dispatch(clearDialysis());
      dispatch(setError());
    }
  }, [error]);

  if (!error.status && error.name === errors.LOADING) {
    return <SplashScreen />;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setExchangeTime(currentDate);
    setHour(currentDate.getHours());
    setMin(currentDate.getMinutes());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={{marginLeft: 10, marginTop: 10}}>
        <Text>Calendar</Text>
      </View>

      <ScrollView>
        <View style={{height: 150, backgroundColor: 'skyblue', margin: 15}}>
          <Text>그래프</Text>
        </View>

        <View>
          <Text>모아보기</Text>
        </View>
      </ScrollView>
    </View>
  );
}
