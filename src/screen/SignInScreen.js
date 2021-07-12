import React from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NativeButton from 'apsl-react-native-button';

import {
  changeLoginField,
  changeIsLoading,
  setUserToken,
  setUser,
  requestLoginWithKakao,
  requestUserInfo,
  setError,
} from '../actions';
import {ScreenStyles, SignInScreenStyles} from '../style/styles';
import {saveItem} from '../utils/asyncStorage';
import {SERVER_PATH} from '../service/apis';
import {useEffect} from 'react/cjs/react.development';
import errors from '../utils/errors';

export default function SignInScreen({navigation}) {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loginFields.isLoading);

  const username = useSelector((state) => state.loginFields.username);
  const password = useSelector((state) => state.loginFields.password);

  const error = useSelector((state) => state.error);

  //const Tab = createBottomTabNavigator;

  function handleChangeLoginField(name, value) {
    dispatch(changeLoginField(name, value));
  }

  function handlePressLogin() {
    if (!username || !password) {
      return Alert.alert('로그인 오류', '아이디 또는 패스워드가 비어있습니다');
    }

    try {
      fetch(SERVER_PATH + '/login', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          email: username,
          password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          const {jwt: accessToken, userInfo, isSuccess, message} = response;

          if (isSuccess) {
            dispatch(setUserToken(accessToken));
            saveItem('userToken', accessToken);

            dispatch(requestUserInfo());
            dispatch(changeIsLoading(false));
          } else {
            dispatch(
              setError({
                status: true,
                name: errors.LOGIN_FAILED,
                message:
                  '네트워크 에러가 발생했습니다. 잠시 후 다시 시도해주세요!',
              }),
            );
            return Alert.alert('로그인 오류', message);
          }
        })
        .catch((fetchErr) => {
          dispatch(
            setError({
              status: true,
              name: errors.LOGIN_ERROR,
              message:
                '네트워크 에러가 발생했습니다. 잠시 후 다시 시도해주세요!',
            }),
          );
          console.log('fetch 오류', fetchErr);
        });
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.LOGIN_ERROR,
          message: '로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요!',
        }),
      );
      console.log('로그인 중 오류', err);
    }
  }

  const handlePressSignInWithKakao = () => {
    console.log('Kakao Login Start');
    dispatch(changeIsLoading(true));
    dispatch(requestLoginWithKakao());
  };

  useEffect(() => {
    if (error.status && error.name === errors.LOGIN_FAILED) {
      Alert.alert('로그인 실패', error.message);
    }

    if (error.status && error.name === errors.LOGIN_ERROR) {
      Alert.alert('네트워크 에러', error.message);
    }
  }, [error]);

  return (
    <View style={ScreenStyles.container}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          backgroundColor: 'pink',
          margin: 40,
        }}>
        <Text style={SignInScreenStyles.loginTitle}>신장 환자를 위한 앱</Text>
      </View>
      <View style={{flex: 2, marginLeft: 40, width: '100%'}}>
        <Text>이메일</Text>
        <TextInput
          style={SignInScreenStyles.loginField}
          placeholder="이메일을 입력해주세요. "
          autoCapitalize="none"
          value={username}
          onChangeText={(value) => handleChangeLoginField('username', value)}
        />
        <Text>비밀번호</Text>
        <TextInput
          style={SignInScreenStyles.loginField}
          placeholder="비밀번호를 입력해주세요. "
          value={password}
          onChangeText={(value) => handleChangeLoginField('password', value)}
          secureTextEntry
        />
      </View>
      <View style={SignInScreenStyles.loginButtonContainer}>
        <NativeButton
          isLoading={isLoading}
          style={SignInScreenStyles.loginButton}
          textStyle={SignInScreenStyles.loginButtonText}
          activeOpacity={0.5}
          onPress={() => {
            // handlePressSignInWithEmail();
            handlePressLogin();
          }}>
          로그인
        </NativeButton>
      </View>
      <View style={{flexDirection: 'row'}}>
        <NativeButton
          isLoading={isLoading}
          style={SignInScreenStyles.JoinButton}
          textStyle={SignInScreenStyles.JoinButtonText}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Join')}>
          아이디 찾기
        </NativeButton>
        <NativeButton
          isLoading={isLoading}
          style={SignInScreenStyles.JoinButton}
          textStyle={SignInScreenStyles.JoinButtonText}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Join')}>
          비밀번호 찾기
        </NativeButton>
        <NativeButton
          isLoading={isLoading}
          style={SignInScreenStyles.JoinButton}
          textStyle={SignInScreenStyles.JoinButtonText}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Join')}>
          회원가입
        </NativeButton>
      </View>

      <NativeButton
        isLoading={isLoading}
        onPress={handlePressSignInWithKakao}
        activeOpacity={0.5}
        style={SignInScreenStyles.btnKakaoLogin}
        textStyle={SignInScreenStyles.txtKakaoLogin}>
        카카오 로그인
      </NativeButton>
    </View>
  );
}
