import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

import {clearUser, clearUserToken, setUser, setUserToken} from '../actions';
import styles from '../style/styles';
import {useCallback} from 'react';
import SplashScreen from './SplashScreen';
import {TextInput} from 'react-native-gesture-handler';
import {convertUserData} from '../utils/convertData';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.userToken);

  function handlePressSignOut() {
    auth().signOut();
    dispatch(clearUserToken());
    dispatch(clearUser());
  }

  if (!user) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Text>Signed in! {user.displayName}</Text>
      <Button title="Sign out" onPress={() => handlePressSignOut()} />
      {user ? <Text>Welcome {user.email}</Text> : <></>}
      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}
