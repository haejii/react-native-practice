import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, View, Image, StyleSheet} from 'react-native';

import {MyPageScreenStyles} from '../style/styles';
import SplashScreen from './SplashScreen';
import {changeJoinField, logout} from '../actions';
import no_user from '../../assets/image/no_user.png';
import RNPickerSelect from 'react-native-picker-select';
import {API_URL} from '@env';
import {pickerItems} from '../../assets/data/pickerData';

export default function MyPageScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.userToken);
  const kidneyType = useSelector((state) => state.JoinFields.kidneyType);

  const noUserImage = Image.resolveAssetSource(no_user).uri;

  async function handlePressSignOut() {
    dispatch(logout());
  }

  async function handlePressChangeUserName() {
    fetch(API_URL, {
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
      .then((response) => console.log(response));
  }

  function handleChangJoinField(name, value) {
    console.log(name, value);
    dispatch(changeJoinField(name, value));
  }

  useEffect(() => {
    if (user) {
      dispatch(changeJoinField('kidneyType', user?.kidneyType));
    }
  }, [dispatch, user]);

  if (!user) {
    return <SplashScreen />;
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2, flexDirection: 'row', top: '5%', left: '2.5%'}}>
        <View style={{flex: 1}}>
          <Image
            style={{width: 80, height: 80, borderRadius: 40}}
            source={{
              uri: user?.profileImageUrl || noUserImage,
            }}
          />
        </View>
        <View style={{flex: 3}}>
          <Text style={{fontSize: 20, fontWeight: '800'}}>
            {user?.nickname || user?.email}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => {
              handleChangJoinField('kidneyType', value);
            }}
            placeholder={pickerItems.kidneyTypes.placeholder({
              value: user?.kidneyType,
            })}
            value={kidneyType}
            style={{
              ...pickerSelectStyles,
              iconContainer: {top: 0, right: 0},
            }}
            items={pickerItems.kidneyTypes.items}
          />
        </View>
      </View>
      <View style={MyPageScreenStyles.ViewContainer}>
        <Text style={MyPageScreenStyles.BasicInformationText}>기본정보</Text>
        <Text style={MyPageScreenStyles.anotherInformationText}>
          나이: {user?.age}
        </Text>
        <Text style={MyPageScreenStyles.anotherInformationText}>
          성별: {user?.gender}
        </Text>
        <Text style={MyPageScreenStyles.anotherInformationText}>
          몸무게: {user?.weight}
        </Text>
        <Text style={MyPageScreenStyles.anotherInformationText}>
          키: {user?.height}
        </Text>
        <Text style={MyPageScreenStyles.anotherInformationText}>
          활동수준:{' '}
          {
            pickerItems.activityTypes.items.find(
              (item) => item.value === user?.activityId,
            )?.label
          }
        </Text>
      </View>
      <View style={MyPageScreenStyles.ViewContainer}>
        <Text style={MyPageScreenStyles.BasicInformationText}>계정정보</Text>
        <Text style={MyPageScreenStyles.anotherInformationText}>
          아이디 : {user?.email}
        </Text>
        <Button
          style={MyPageScreenStyles.TouchBtn}
          title="비밀번호 재설정"
          onPress={() => {}}
        />
        <Button
          style={MyPageScreenStyles.TouchBtn}
          title="로그아웃"
          onPress={() => handlePressSignOut()}
        />
      </View>

      {/* <Text>{JSON.stringify(user)}</Text> */}
      {/* <Text>{JSON.stringify(userToken)}</Text> */}
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '80%',
    fontSize: 18,
    fontWeight: '800',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
