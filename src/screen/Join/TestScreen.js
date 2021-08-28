import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
  Button,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {changeJoinField, logout, setKakaoUser} from '../../actions';
import {JoinScreenStyles, ScreenStyles} from '../../style/styles';
import NativeButton from 'apsl-react-native-button';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import {pickerItems} from '../../../assets/data/pickerData';
import {getTwoDigits} from '../../utils/functions';
import {SERVER_PATH} from '../../service/apis';
import errors from '../../utils/errors';
import RNRestart from 'react-native-restart';
import Picker from '@gregfrench/react-native-wheel-picker';

export default function TestScreen({
  navigation,
  route: {params: {userInfo, accessToken} = {}} = {},
}) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);
  const email = useSelector((state) => state.JoinFields.email);
  const [btn, setBtn] = useState(false);
  const [validation, setValidation] = useState(1);
  const [page, setPage] = useState(1);

  function handleChangJoinField(name, value) {
    dispatch(changeJoinField(name, value));
  }

  function handelPressEmailCheck() {
    if (!email) {
      return Alert.alert('이메일 오류', '이메일을 입력하세요. ');
    }
    setBtn(true);

    fetch(SERVER_PATH + '/EmailValidation', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.isSuccess === false) {
          return Alert.alert('중복', '중복된 이메일입니다.');
        } else {
          return Alert.alert('사용가능', '사용가능 이메일 입니다.');
        }
      })
      .catch((fetchErr) => {
        return Alert.alert(
          '이메일 중복 확인 에러',
          '이메일 중복 확인 중 에러가 발생했습니다. \n 잠시 후 다시 시도해주세요',
        );
      });
  }

  function handlePressValidation() {
    if (data === myData) {
      return '인증이 완료되었습니다. ';
    }
  }

  return (
    <View style={ScreenStyles.container}>
      {userInfo && (
        <View style={{flex: 1, alignItems: 'center', top: 10}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {userInfo ? '카카오톡 회원가입' : '회원가입'}
          </Text>
        </View>
      )}

      <View style={{flex: 3, alignItems: 'center', width: '100%'}}>
        {!userInfo ? (
          page === 1 ? (
            <View style={JoinScreenStyles.ViewContainer}>
              <Text style={JoinScreenStyles.JoinFieldMainText}>이메일 </Text>

              <TextInput
                autoCapitalize="none"
                style={JoinScreenStyles.JoinFieldWithBtn}
                placeholder="이메일을 입력해주세요."
                value={email}
                onChangeText={(value) => handleChangJoinField('email', value)}
              />
              <NativeButton
                style={JoinScreenStyles.checkIdBtn}
                textStyle={JoinScreenStyles.GenderButtonText}
                onPress={() => {
                  handelPressEmailCheck();
                }}>
                인증요청
              </NativeButton>

              {btn === true && (
                <View style={JoinScreenStyles.ViewContainer}>
                  <Text style={JoinScreenStyles.JoinFieldMainText}>
                    인증번호 입력
                  </Text>

                  <TextInput
                    autoCapitalize="none"
                    style={JoinScreenStyles.JoinFieldWithBtn}
                    placeholder="이메일을 입력해주세요."
                    value={validation}
                    onChangeText={(value) => setValidation(value)}
                  />
                  <NativeButton
                    style={JoinScreenStyles.checkIdBtn}
                    textStyle={JoinScreenStyles.GenderButtonText}
                    onPress={() => {
                      setPage(2);
                    }}>
                    다음
                  </NativeButton>
                </View>
              )}
            </View>
          ) : page === 2 ? (
            <View style={JoinScreenStyles.ViewContainer}>
              <View style={JoinScreenStyles.ViewContainer}>
                <Text style={JoinScreenStyles.JoinFieldMainText}>
                  닉네임, 비밀번호, 키, 몸무게{' '}
                </Text>

                <NativeButton onPress={() => setPage(3)}>다음</NativeButton>
              </View>
            </View>
          ) : page === 3 ? (
            <View style={JoinScreenStyles.ViewContainer}>
              <View style={JoinScreenStyles.ViewContainer}>
                <Text style={JoinScreenStyles.JoinFieldMainText}>
                  생년월일{' '}
                </Text>

                <NativeButton onPress={() => setPage(4)}>다음</NativeButton>
              </View>
            </View>
          ) : page === 4 ? (
            <View style={JoinScreenStyles.ViewContainer}>
              <View style={JoinScreenStyles.ViewContainer}>
                <Text style={JoinScreenStyles.JoinFieldMainText}>
                  활동수준{' '}
                </Text>

                <NativeButton onPress={() => setPage(5)}>다음</NativeButton>
              </View>
            </View>
          ) : page === 5 ? (
            <View style={JoinScreenStyles.ViewContainer}>
              <View style={JoinScreenStyles.ViewContainer}>
                <Text style={JoinScreenStyles.JoinFieldMainText}>
                  건강상태{' '}
                </Text>

                <NativeButton onPress={() => setPage(6)}>다음</NativeButton>
              </View>
            </View>
          ) : (
            <View style={JoinScreenStyles.ViewContainer}>
              <View style={JoinScreenStyles.ViewContainer}>
                <Text style={JoinScreenStyles.JoinFieldMainText}>이메일 </Text>

                <NativeButton onPress={() => setPage(7)}>다음</NativeButton>
              </View>
            </View>
          )
        ) : null}
      </View>
    </View>
  );
}

function Page1() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);
  const email = useSelector((state) => state.JoinFields.email);
  const [btn, setBtn] = useState(false);
  const [validation, setValidation] = useState(0);

  function handleChangJoinField(name, value) {
    dispatch(changeJoinField(name, value));
  }

  function handelPressEmailCheck() {
    if (!email) {
      return Alert.alert('이메일 오류', '이메일을 입력하세요. ');
    }
    setBtn(true);

    fetch(SERVER_PATH + '/EmailValidation', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.isSuccess === false) {
          return Alert.alert('중복', '중복된 이메일입니다.');
        } else {
          return Alert.alert('사용가능', '사용가능 이메일 입니다.');
        }
      })
      .catch((fetchErr) => {
        return Alert.alert(
          '이메일 중복 확인 에러',
          '이메일 중복 확인 중 에러가 발생했습니다. \n 잠시 후 다시 시도해주세요',
        );
      });
  }

  function handlePressValidation({data}) {
    if (data === myData) {
      return '인증이 완료되었습니다. ';
    }
  }

  return (
    <View style={JoinScreenStyles.ViewContainer}>
      <Text style={JoinScreenStyles.JoinFieldMainText}>이메일 </Text>

      <TextInput
        autoCapitalize="none"
        style={JoinScreenStyles.JoinFieldWithBtn}
        placeholder="이메일을 입력해주세요."
        value={email}
        onChangeText={(value) => handleChangJoinField('email', value)}
      />
      <NativeButton
        style={JoinScreenStyles.checkIdBtn}
        textStyle={JoinScreenStyles.GenderButtonText}
        onPress={() => {
          handelPressEmailCheck();
        }}>
        인증요청
      </NativeButton>

      {btn === true && (
        <View style={JoinScreenStyles.ViewContainer}>
          <Text style={JoinScreenStyles.JoinFieldMainText}>인증번호 입력</Text>

          <TextInput
            autoCapitalize="none"
            style={JoinScreenStyles.JoinFieldWithBtn}
            placeholder="이메일을 입력해주세요."
            value={validation}
            onChangeText={(value) => setValidation(value)}
          />
          <NativeButton
            style={JoinScreenStyles.checkIdBtn}
            textStyle={JoinScreenStyles.GenderButtonText}
            onPress={() => {
              handelPressEmailCheck();
            }}>
            다음
          </NativeButton>
        </View>
      )}
    </View>
  );
}
