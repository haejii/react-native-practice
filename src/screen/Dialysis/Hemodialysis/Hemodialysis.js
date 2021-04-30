import React, {useState} from 'react';
import {
  Text,
  View,
  Platform,
  Button,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AgendaScreen from '../../../moduleComponent/AgendaScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import {SERVER_PATH} from '../../../service/apis';
import {useSelector, useDispatch} from 'react-redux';
import {
  addHemodialysisMemo,
  updateHemodialysisMemo,
  fetchMemos,
  setError,
  deleteHemodialysisMemo,
} from '../../../actions';
import {useEffect} from 'react/cjs/react.development';
import errors from '../../../utils/errors';
import SplashScreen from '../../SplashScreen';

const Stack = createStackNavigator();

function InputMemo({
  navigation,
  route: {
    params: {date},
  },
}) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);
  const kidneyType = useSelector((state) => state.user.kidneyType);
  const [photo, setPhoto] = useState(null);
  const [memo, setMemo] = useState('');

  const handleChangeMemo = (value) => {
    setMemo(value);
  };

  const handlePressShowImagePicker = () => {
    Alert.alert(
      '선택해주세요',
      '',
      [
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
                console.log(
                  'User tapped custom button: ',
                  response.customButton,
                );
                Alert.alert(response.customButton);
              } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // console.log(response.uri);
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
      ],
      // {
      //   cancelable: true,
      //   onDismiss: () =>
      //     Alert.alert(
      //       'This alert was dismissed by tapping outside of the alert dialog.',
      //     ),
      // },
    );

    // launchImageLibrary(options, (res) => {
    //   console.log(res);
    // });
  };

  const handlePressAddMemo = () => {
    if (!memo) {
      Alert.alert('메모 작성 실패', '메모를 입력해주세요');
      return;
    }
    dispatch(addHemodialysisMemo(photo, memo, date, kidneyType));
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

    if (!error.status && error.name === errors.ADD_DIALYSIS_MEMOS_SUCCESS) {
      navigation.goBack();
      dispatch(fetchMemos(date));
      dispatch(setError());
    }
  }, [error]);

  if (!error.status && error.name === errors.LOADING) {
    return <SplashScreen text={error.message} />;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{date}</Text>
      <Text>메모 및 사진</Text>
      <TextInput
        style={{
          marginVertical: 20,
          borderRadius: 20,
          height: 200,
          width: '80%',
          backgroundColor: 'white',
          fontSize: 20,
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        multiline={true}
        placeholder={'메모를 입력해주세요'}
        value={memo}
        onChangeText={(value) => handleChangeMemo(value)}
      />
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
              uri: photo ? photo.uri : Image.resolveAssetSource(no_user).uri,
            }}
            style={{
              resizeMode: 'stretch',
              borderRadius: 20,
              width: '100%',
              height: 300,
            }}
          />
        ) : (
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
            사진 첨부하기
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          top: 20,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <Button title="저장하기" onPress={() => handlePressAddMemo()} />
        <Button
          title="뒤로가기"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

function UpdateMemo({
  navigation,
  route: {
    params: {item},
  },
}) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);

  const [photo, setPhoto] = useState(null);
  const [memo, setMemo] = useState('');

  const handleChangeMemo = (value) => {
    setMemo(value);
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
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              // console.log(response.uri);
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

  const handlePressUpdateMemo = () => {
    if (!memo) {
      Alert.alert('메모 수정 실패', '메모를 입력해주세요');
      return;
    }

    dispatch(
      updateHemodialysisMemo({
        dialysisId: item.dialysisId,
        image: photo,
        name: memo,
      }),
    );
  };

  const handlePressDeleteMemo = () => {
    Alert.alert('삭제', '정말 삭제하시겠습니까?', [
      {
        text: '삭제',
        onPress: () => {
          dispatch(deleteHemodialysisMemo(item.dialysisId));
        },
      },
      {text: '취소'},
    ]);
  };

  useEffect(() => {
    if (
      (error.status && error.name === errors.UPDATE_DIALYSIS_MEMOS_FAILED) ||
      error.name === errors.DELETE_DIALYSIS_MEMOS_FAILED
    ) {
      Alert.alert('메모 수정 / 삭제 실패', errors.message);
      dispatch(setError());
    }

    if (error.status && error.name === errors.UPDATE_DIALYSIS_MEMOS_ERROR) {
      Alert.alert(
        '오류 발생',
        '메모 수정 / 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
      );
      dispatch(setError());
    }

    if (
      !error.status &&
      (error.name === errors.UPDATE_DIALYSIS_MEMOS_SUCCESS ||
        error.name === errors.DELETE_DIALYSIS_MEMOS_SUCCESS)
    ) {
      navigation.navigate('Calendar');
      dispatch(fetchMemos(item.date));
      dispatch(setError());
    }
  }, [error]);

  useEffect(() => {
    setMemo(item.name);
    setPhoto(item.image);
    // console.log(item.image);
  }, []);

  if (!error.status && error.name === errors.LOADING) {
    return <SplashScreen text={error.message} />;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{item.date}</Text>
      <Text>메모 및 사진 수정하기</Text>
      <TextInput
        style={{
          marginVertical: 20,
          borderRadius: 20,
          height: 200,
          width: '80%',
          backgroundColor: 'white',
          fontSize: 20,
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        multiline={true}
        placeholder={'메모를 입력해주세요'}
        value={memo}
        onChangeText={(value) => handleChangeMemo(value)}
      />
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
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
            사진 첨부하기
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          top: 20,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <Button title="수정하기" onPress={() => handlePressUpdateMemo()} />
        <Button title="삭제하기" onPress={() => handlePressDeleteMemo()} />
        <Button
          title="뒤로가기"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}
export default function Hemodialysis() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Calendar" component={AgendaScreen} />
      <Stack.Screen name="InputMemo" component={InputMemo} />
      <Stack.Screen name="UpdateMemo" component={UpdateMemo} />
    </Stack.Navigator>
  );
}
