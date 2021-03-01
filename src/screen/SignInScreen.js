import React, {useEffect} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NativeButton from 'apsl-react-native-button';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';

import {
  changeLoginField,
  requestLoginWithFirebase,
  requestJoinWithFirebase,
  changeIsLoading,
  setUserToken,
  clearUser,
  clearUserToken,
  setUser,
  requestLoginWithKakao,
} from '../actions';
import {ScreenStyles, SignInScreenStyles} from '../style/styles';

export default function SignInScreen() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loginFields.isLoading);

  const username = useSelector((state) => state.loginFields.username);
  const password = useSelector((state) => state.loginFields.password);

  function handleChangeLoginField(name, value) {
    dispatch(changeLoginField(name, value));
  }

  function handlePressSignInWithEmail() {
    if (!username || !password) {
      return Alert.alert('로그인 오류', '아이디 또는 패스워드가 비어있습니다');
    }

    dispatch(requestLoginWithFirebase(username, password));
    dispatch(changeIsLoading(true));
  }

  function handlePressSignUpWithEmail() {
    if (!username || !password) {
      return Alert.alert(
        '회원가입 오류',
        '아이디 또는 패스워드가 비어있습니다',
      );
    }

    dispatch(requestJoinWithFirebase(username, password));
    dispatch(changeIsLoading(true));
  }

  function handlePressJoin() {
    if (!username || !password) {
      return Alert.alert(
        '회원가입 오류',
        '아이디 또는 패스워드가 비어있습니다',
      );
    }
  }

  const handlePressSignInWithKakao = () => {
    console.log('Kakao Login Start');
    dispatch(changeIsLoading(true));
    dispatch(requestLoginWithKakao());
  };

  const _handlePressSignInWithKakao = () => {
    console.log('Kakao Login Start');
    dispatch(changeIsLoading(true));

    KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
      .then((result) => {
        dispatch(setUserToken(result.accessToken));
        console.log(`Login Finished:${JSON.stringify(result)}`);
        dispatch(changeIsLoading(false));

        KakaoLogins.getProfile()
          .then((profileResult) => {
            console.log(
              `Get Profile Finished:${JSON.stringify(profileResult)}`,
            );

            const {nickname, profile_image_url, email, id} = profileResult;

            dispatch(
              setUser({
                uid: id,
                photoURL: profile_image_url,
                displayName: nickname,
              }),
            );

            KakaoLogins.getTokens().then((tokens) => {
              console.log(tokens);
              dispatch(setUserToken(tokens.accessToken));
            });
          })
          .catch((err) => {
            console.log(`Get Profile Failed:${err.code} ${err.message}`);
          });
      })
      .catch((err) => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          console.log(`Login Cancelled:${err.message}`);
          dispatch(changeIsLoading(false));
        } else {
          console.log(`Login Failed:${err.code} ${err.message}`);
          dispatch(changeIsLoading(false));
        }
      });
  };

  const kakaoLogout = () => {
    console.log('Logout Start');
    dispatch(changeIsLoading(true));

    KakaoLogins.unlink()
      .then((result) => {
        dispatch(clearUserToken());
        dispatch(clearUser());
        console.log(`Logout Finished:${result}`);
        dispatch(changeIsLoading(false));
      })
      .catch((err) => {
        console.log(`Logout Failed:${err.code} ${err.message}`);
        dispatch(changeIsLoading(false));
      });
  };

  useEffect(() => {}, [username, password]);

  return (
    <View style={ScreenStyles.container}>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Text style={SignInScreenStyles.loginTitle}>신장 환자를 위한 앱</Text>
      </View>
      <View style={{flex: 3, alignItems: 'center', width: '100%'}}>
        <TextInput
          style={SignInScreenStyles.loginField}
          placeholder="Email"
          autoCapitalize="none"
          value={username}
          onChangeText={(value) => handleChangeLoginField('username', value)}
        />
        <TextInput
          style={SignInScreenStyles.loginField}
          placeholder="Password"
          value={password}
          onChangeText={(value) => handleChangeLoginField('password', value)}
          secureTextEntry
        />
        <View style={SignInScreenStyles.loginButtonContainer}>
          <NativeButton
            isLoading={isLoading}
            style={SignInScreenStyles.loginButton}
            textStyle={SignInScreenStyles.loginButtonText}
            activeOpacity={0.5}
            onPress={() => handlePressSignInWithEmail()}>
            로그인
          </NativeButton>
          <NativeButton
            isLoading={isLoading}
            style={SignInScreenStyles.loginButton}
            textStyle={SignInScreenStyles.loginButtonText}
            activeOpacity={0.5}
            onPress={() => {
              // handlePressSignUpWithEmail();
              handlePressJoin();
            }}>
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
    </View>
  );
}
