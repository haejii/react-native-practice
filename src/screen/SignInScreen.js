import React, {useEffect} from 'react';
import {Button, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {changeLoginField, requestLogin} from '../actions';
import styles from '../style/styles';

export default function SignInScreen() {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.loginFields.username);
  const password = useSelector((state) => state.loginFields.password);

  function handleChangeLoginField(name, value) {
    dispatch(changeLoginField(name, value));
  }

  function handlePressSignIn() {
    if (!username || !password) {
      return alert.alert('로그인 오류', '아이디 또는 패스워드가 비어있습니다');
    }
    dispatch(requestLogin(username, password));
  }

  useEffect(() => {}, [username, password]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.loginField}
        placeholder="Username"
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
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handlePressSignIn()}>
        <Button color="white" title="Sign in" />
      </TouchableOpacity>
    </View>
  );
}
