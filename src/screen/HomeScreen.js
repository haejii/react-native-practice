import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearUserToken} from '../actions';
import styles from '../style/styles';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.userToken);

  function handlePressSignOut() {
    dispatch(clearUserToken());
  }

  useEffect(() => {
    console.log('homescreen effect', userToken);
  }, [userToken]);

  return (
    <View style={styles.container}>
      <Text>Signed in! {userToken}</Text>
      <Button title="Sign out" onPress={() => handlePressSignOut()} />
    </View>
  );
}
