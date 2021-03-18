import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, View, Image} from 'react-native';
import database from '@react-native-firebase/database';

import SplashScreen from './SplashScreen';
import {logout} from '../actions';
import {ScreenStyles} from '../style/styles';
import {SERVER_PATH} from '../service/apis';

export default function MyPageScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.userToken);

  async function handlePressSignOut() {
    dispatch(logout());
  }

  async function handlePressChangeUserName() {
    fetch(SERVER_PATH, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken.accessToken,
      },
      method: 'patch',

      body: JSON.stringify({
        name: '드림찬',
      }),
    })
      .then((res) => res.json())
      .then((response) => console.log(res));
  }

  // useEffect(() => {
  //   database()
  //     .ref('/users/123')
  //     .once('value')
  //     .then((snapshot) => {
  //       if (!snapshot) {
  //       } else {
  //         console.log(snapshot);
  //       }
  //     });
  // }, [user]);

  if (!user) {
    return <SplashScreen />;
  }

  return (
    <View style={ScreenStyles.container}>
      <Text>Signed in! {user.displayName}</Text>
      <Button title="Sign out" onPress={() => handlePressSignOut()} />
      <Image
        style={{width: 180, height: 180}}
        source={{uri: user?.user?.profileImageUrl}}
      />
      <Text style={{fontSize: 20}}>
        <Text style={{fontWeight: '800'}}>
          {user?.user?.nickname || user?.user?.email}
        </Text>
        님 환영합니다.
      </Text>

      {/* <Text>{JSON.stringify(user)}</Text> */}
      {/* <Text>{JSON.stringify(userToken)}</Text> */}
    </View>
  );
}
