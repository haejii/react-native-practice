import React from 'react';
import {View, Text} from 'react-native';
import NativeButton from 'apsl-react-native-button';

export default function JoinCompleteScreen({navigation}) {
  return (
    <View>
      <Text>회원가입 완료</Text>
      <NativeButton onPress={() => navigation.navigate('SignIn')}>
        로그인하러가기
      </NativeButton>
    </View>
  );
}
