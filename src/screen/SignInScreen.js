import React, {useEffect} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {
  changeLoginField,
  requestLoginWithFirebase,
  requestJoinWithFirebase,
  changeIsLoading,
} from '../actions';
import styles from '../style/styles';
import auth from '@react-native-firebase/auth';

export default function SignInScreen() {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.loginFields.username);
  const password = useSelector((state) => state.loginFields.password);

  function handleChangeLoginField(name, value) {
    dispatch(changeLoginField(name, value));
  }

  function handlePressSignIn() {
    if (!username || !password) {
      return Alert.alert('로그인 오류', '아이디 또는 패스워드가 비어있습니다');
    }

    dispatch(requestLoginWithFirebase(username, password));
    dispatch(changeIsLoading(true));
  }

  function handlePressSignUp() {
    if (!username || !password) {
      return alert.alert(
        '회원가입 오류',
        '아이디 또는 패스워드가 비어있습니다',
      );
    }
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => console.log('SignUp Success!'))
      .catch((err) => console.log(err));

    dispatch(requestJoinWithFirebase(username, password));
    dispatch(changeIsLoading(true));
  }

  useEffect(() => {}, [username, password]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.loginField}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={(value) => handleChangeLoginField('username', value)}
      />
      <TextInput
        style={styles.loginField}
        placeholder="Password"
        value={password}
        onChangeText={(value) => handleChangeLoginField('password', value)}
        secureTextEntry
      />
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handlePressSignIn()}>
          <Button color="white" title="Sign in" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handlePressSignUp()}>
          <Button color="white" title="Sign up" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
