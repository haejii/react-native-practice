import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, View} from 'react-native';
import database from '@react-native-firebase/database';

import SplashScreen from './SplashScreen';
import {logout} from '../actions';
import {ScreenStyles} from '../style/styles';

export default function MyPageScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  async function handlePressSignOut() {
    dispatch(logout());
  }

  useEffect(() => {
    database()
      .ref('/users/123')
      .once('value')
      .then((snapshot) => {
        if (!snapshot) {
        } else {
          console.log(snapshot);
        }
      });
  }, [user]);

  if (!user) {
    return <SplashScreen />;
  }

  return (
    <View style={ScreenStyles.container}>
      <Text>Signed in! {user.displayName}</Text>
      <Button title="Sign out" onPress={() => handlePressSignOut()} />
      {user ? <Text>Welcome {user.email}</Text> : <></>}
      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}
