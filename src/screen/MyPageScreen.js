import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';

import {
  BarStyle,
  FoodInformationModalStyles,
  HomeScreenStyles,
  MyPageScreenStyles,
} from '../style/styles';
import SplashScreen from './SplashScreen';
import {
  changeJoinField,
  changePassword,
  changePasswordField,
  requestUpdateBasicInfo,
  logout,
} from '../actions';
import no_user from '../../assets/image/no_user.png';
import RNPickerSelect from 'react-native-picker-select';
import {pickerItems} from '../../assets/data/pickerData';
import {TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAddressCard,
  faUniversalAccess,
  faTransgender,
  faChevronRight,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import NativeButton from 'apsl-react-native-button';

export default function MyPageScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const activityId = useSelector((state) => state.JoinFields.activityId);
  const kidneyType = useSelector((state) => state.JoinFields.kidneyType);
  const weight = useSelector((state) => state.JoinFields.weight);
  const {current, willBeChanged} = useSelector(
    (state) => state.changePasswordFields,
  );

  const noUserImage = Image.resolveAssetSource(no_user).uri;

  const [isOpenBasicInfo, setIsOpenBasicInfo] = useState(false);
  const [isOpenAccountInfo, setIsOpenAccountInfo] = useState(false);

  const handlePressBasicInfoModal = () => {
    setIsOpenBasicInfo(!isOpenBasicInfo);
  };

  const handlePressAccountInfoModal = () => {
    setIsOpenAccountInfo(!isOpenAccountInfo);
  };
  async function handlePressSignOut() {
    dispatch(logout());
  }
  function handleChangeJoinField(name, value) {
    dispatch(changeJoinField(name, value));
  }

  const handlePressUpdateBasicInfo = () => {
    dispatch(requestUpdateBasicInfo({weight, kidneyType, activityId}));
    handlePressBasicInfoModal();
  };

  const handlePressNonUpdateBasicInfo = () => {
    dispatch(changeJoinField('weight', user?.weight));
    handlePressBasicInfoModal();
  };

  const handleChangePasswordField = (name, value) => {
    dispatch(changePasswordField(name, value));
  };

  const handlePressUpdatePassword = () => {
    if (willBeChanged.length < 6 || willBeChanged.length > 20) {
      return Alert.alert(
        '비밀번호 입력오류',
        '비밀번호는 6자리 이상 입력해주세요.',
      );
    }
    dispatch(changePassword(current, willBeChanged));
    setIsOpenAccountInfo(!isOpenAccountInfo);
  };

  const handlePressNonUpdatePassword = () => {
    dispatch(changePasswordField('current', ''));
    dispatch(changePasswordField('willBeChanged', ''));
    setIsOpenAccountInfo(!isOpenAccountInfo);
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      dispatch(changeJoinField('activityId', user?.activityId));
      dispatch(changeJoinField('kidneyType', user?.kidneyType));
      dispatch(changeJoinField('weight', user?.weight));
    }
  }, [dispatch, user]);

  if (!user) {
    return <SplashScreen />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={BarStyle.ViewContainer} />

        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            top: '5%',
            left: '2.5%',
            marginBottom: 30,
          }}>
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
            <Text style={{top: 10, fontSize: 20, fontWeight: '800'}}>
              {
                pickerItems.kidneyTypes.items.find((item) => {
                  return item.value === user?.kidneyType;
                })?.label
              }
            </Text>
          </View>
        </View>

        <View style={MyPageScreenStyles.ViewContainer}>
          {/* <Text style={MyPageScreenStyles.BasicInformationText}>기본정보</Text> */}
          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faAddressCard} size={20} />
            </View>
            <Text style={MyPageScreenStyles.anotherInformationText}>
              기본정보
            </Text>
          </View>
          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faTransgender} size={20} />
            </View>
            <Text style={MyPageScreenStyles.anotherInformationText}>
              나이: {user?.age}세
            </Text>
          </View>

          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faTransgender} size={20} />
            </View>
            <Text style={MyPageScreenStyles.anotherInformationText}>
              성별: {user?.gender === 'F' ? '여성' : '남성'}
            </Text>
          </View>

          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faTransgender} size={20} />
            </View>
            <Text style={MyPageScreenStyles.anotherInformationText}>
              키: {user?.height}cm
            </Text>
          </View>

          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faTransgender} size={20} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{...MyPageScreenStyles.anotherInformationText}}>
                몸무게: {user?.weight}kg
              </Text>
            </View>
          </View>

          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faUniversalAccess} size={20} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={MyPageScreenStyles.anotherInformationText}>
                활동수준:{' '}
                {
                  pickerItems.activityTypes.items.find(
                    (item) => item.value === user?.activityId,
                  )?.label
                }
              </Text>
              <View />
            </View>
          </View>
          {/* <View style={MyPageScreenStyles.AndroidTouchBtnContainer}>
          <NativeButton
            style={{height: 20, width: '35%'}}
            onPress={() => handlePressBasicInfoModal()}>
            기본정보 변경
          </NativeButton>
        </View> */}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <FontAwesomeIcon
              style={{marginTop: 7, marginLeft: 3}}
              icon={faChevronRight}
              size={20}
            />
            <View style={{margin: 1}}>
              <NativeButton
                style={{
                  height: 30,
                  width: 160,
                  borderColor: 'black',
                  backgroundColor: '#F5F5F5',
                }}
                onPress={() => handlePressBasicInfoModal()}>
                기본정보 변경하기
              </NativeButton>
            </View>
          </View>
        </View>

        <View style={MyPageScreenStyles.ViewContainer}>
          <View
            style={{
              borderWidth: 1,
              marginBottom: 5,
              marginTop: 3,
              marginBottom: 10,
              //color: 'pink',
              width: '90%',
            }}
          />
          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faIdCard} size={20} />
            </View>
            <Text style={MyPageScreenStyles.anotherInformationText}>
              계정정보
            </Text>
          </View>

          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faIdCard} size={20} />
            </View>
            <Text style={MyPageScreenStyles.anotherInformationText}>
              아이디 : {user?.email}
            </Text>
          </View>

          {!user?.loginType ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <FontAwesomeIcon
                style={{marginTop: 7, marginLeft: 3}}
                icon={faChevronRight}
                size={20}
              />
              <View style={{margin: 1}}>
                <NativeButton
                  style={{
                    height: 30,
                    width: 160,
                    borderColor: 'black',
                    backgroundColor: '#F5F5F5',
                  }}
                  onPress={() => handlePressAccountInfoModal()}>
                  비밀번호 변경하기
                </NativeButton>
              </View>
            </View>
          ) : (
            <Text style={{fontSize: 16}}>( 카카오 아이디로 로그인 됨 )</Text>
          )}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faChevronRight} size={20} />
            </View>
            <View style={{margin: 1}}>
              <NativeButton
                style={{
                  height: 30,
                  width: 160,
                  borderColor: 'black',
                  backgroundColor: '#F5F5F5',
                }}
                onPress={() => handlePressSignOut()}>
                로그아웃
              </NativeButton>
            </View>
          </View>
        </View>

        <View style={MyPageScreenStyles.ViewContainer}>
          <View
            style={{
              borderWidth: 1,
              marginBottom: 5,
              marginTop: 20,
              //color: 'pink',
              width: '90%',
            }}
          />
          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faAddressCard} size={20} />
            </View>
            <Text style={MyPageScreenStyles.anotherInformationText}>
              어플정보
            </Text>
          </View>

          <View style={MyPageScreenStyles.includeView}>
            <View style={MyPageScreenStyles.iconView}>
              <FontAwesomeIcon icon={faAddressCard} size={20} />
            </View>
            <Text style={MyPageScreenStyles.anotherInformationText}>
              1:1 문의하기
            </Text>
          </View>
        </View>
        {/* <Text>{JSON.stringify(user)}</Text> */}
        {/* <Text>{JSON.stringify(userToken)}</Text> */}

        <Modal
          visible={isOpenBasicInfo}
          animationType="slide"
          transparent={true}
          onRequestClose={handlePressBasicInfoModal}>
          <View style={FoodInformationModalStyles.modalViewContainer}>
            <View style={FoodInformationModalStyles.modalView}>
              <View style={HomeScreenStyles.nuturitionInputContainer}>
                <Text style={HomeScreenStyles.nuturitionInputSubject}>
                  기본정보 수정
                </Text>

                <Text style={HomeScreenStyles.nuturitionTitle}>건강상태</Text>
                <RNPickerSelect
                  onValueChange={(value) => {
                    if (value) {
                      handleChangeJoinField('kidneyType', value);
                    }
                  }}
                  placeholder={pickerItems.kidneyTypes.placeholder({
                    value: null,
                  })}
                  value={kidneyType}
                  style={{
                    // ...pickerSelectStyles,
                    inputIOS: {
                      fontSize: 18,
                      fontWeight: '800',
                      // paddingVertical: 1,
                      // paddingHorizontal: 10,
                      backgroundColor: 'yellow',
                      borderRadius: 5,
                      borderWidth: 1.5,
                      padding: 10,
                      borderColor: 'gray',
                      color: 'black',
                      // paddingRight: 30, // to ensure the text is never behind the icon
                      marginBottom: 20,
                    },
                    inputAndroid: {
                      width: 200,
                      top: 11,
                      left: 10,
                      color: 'teal',
                    },
                    iconContainer: {top: 0, right: 0},
                  }}
                  items={pickerItems.kidneyTypes.items}
                />

                <Text style={HomeScreenStyles.nuturitionTitle}>활동수준</Text>
                <RNPickerSelect
                  onValueChange={(value) => {
                    if (value) {
                      handleChangeJoinField('activityId', value);
                    }
                  }}
                  placeholder={pickerItems.activityTypes.placeholder({
                    value: null,
                  })}
                  value={activityId}
                  style={{
                    inputIOS: {
                      fontSize: 18,
                      fontWeight: '800',
                      // paddingVertical: 1,
                      // paddingHorizontal: 10,
                      backgroundColor: 'yellow',
                      borderRadius: 5,
                      borderWidth: 1.5,
                      padding: 10,
                      borderColor: 'gray',
                      color: 'black',
                      // paddingRight: 30, // to ensure the text is never behind the icon
                      marginBottom: 20,
                    },
                    inputAndroid: {
                      width: 200,
                      top: 11,
                      left: 10,
                      color: 'teal',
                    },
                    iconContainer: {top: 0, right: 0},
                  }}
                  items={pickerItems.activityTypes.items}
                />

                <Text style={HomeScreenStyles.nuturitionTitle}>몸무게</Text>
                <TextInput
                  style={HomeScreenStyles.nuturitionInput}
                  keyboardType="number-pad"
                  value={String(weight)}
                  onChangeText={(value) => {
                    handleChangeJoinField(
                      'weight',
                      value.replace(/[^0-9]/g, ''),
                    );
                  }}
                />
              </View>

              <View style={FoodInformationModalStyles.modalButtonContainer}>
                <Button
                  title="수정"
                  onPress={() => handlePressUpdateBasicInfo(weight)}
                />
                <Button
                  title="취소"
                  onPress={() => handlePressNonUpdateBasicInfo()}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isOpenAccountInfo}
          animationType="slide"
          transparent={true}
          onRequestClose={handlePressAccountInfoModal}>
          <View style={FoodInformationModalStyles.modalViewContainer}>
            <View style={FoodInformationModalStyles.modalView}>
              <View style={HomeScreenStyles.nuturitionInputContainer}>
                <Text style={HomeScreenStyles.nuturitionInputSubject}>
                  비밀번호 재설정
                </Text>

                <Text style={HomeScreenStyles.nuturitionTitle}>
                  현재 비밀번호
                </Text>
                <TextInput
                  style={HomeScreenStyles.nuturitionInput}
                  placeholder="현재 비밀번호"
                  secureTextEntry={true}
                  value={current}
                  onChangeText={(value) => {
                    handleChangePasswordField('current', value);
                  }}
                />

                <Text style={HomeScreenStyles.nuturitionTitle}>
                  새로운 비밀번호
                </Text>
                <TextInput
                  style={HomeScreenStyles.nuturitionInput}
                  placeholder="새로운 비밀번호"
                  secureTextEntry={true}
                  value={willBeChanged}
                  onChangeText={(value) => {
                    handleChangePasswordField('willBeChanged', value);
                  }}
                />
              </View>

              <View style={FoodInformationModalStyles.modalButtonContainer}>
                <Button
                  title="수정"
                  onPress={() => handlePressUpdatePassword()}
                />
                <Button
                  title="취소"
                  onPress={() => handlePressNonUpdatePassword()}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
    color: 'teal',
    width: 250,
  },
});
