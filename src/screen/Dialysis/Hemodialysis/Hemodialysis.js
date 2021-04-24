import React, {useState} from 'react';
import {
  Text,
  View,
  Platform,
  Button,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AgendaScreen from '../../../moduleComponent/AgendaScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import no_user from '../../../../assets/image/no_user.png';
import {SERVER_PATH} from '../../../service/apis';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

function InputMemo({
  navigation,
  route: {
    params: {date, userToken},
  },
}) {
  // const userToken = useSelector((state) => state.userToken);

  const [photo, setPhoto] = useState(null);
  const [memo, setMemo] = useState('');

  const handleChangeMemo = (value) => {
    setMemo(value);
  };

  const handlePressShowImagePicker = () => {
    Alert.alert(
      '선택해주세요',
      '',
      [
        {
          text: '사진 찍기',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '갤러리에서 불러오기',
          onPress: () => {
            launchImageLibrary({}, (response) => {
              console.log('Response = ', response);

              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log(
                  'User tapped custom button: ',
                  response.customButton,
                );
                Alert.alert(response.customButton);
              } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // console.log(response.uri);
                setPhoto(response);
              }
            });
          },
          style: 'cancel',
        },
        {
          text: '닫기',
          style: 'cancel',
        },
      ],
      // {
      //   cancelable: true,
      //   onDismiss: () =>
      //     Alert.alert(
      //       'This alert was dismissed by tapping outside of the alert dialog.',
      //     ),
      // },
    );

    // launchImageLibrary(options, (res) => {
    //   console.log(res);
    // });
  };

  const createFormData = (image, body) => {
    const data = new FormData();

    data.append('image', {
      name: image.fileName,
      type: image.type,
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    });

    console.log(body);

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    console.log(data);

    return data;
  };

  const sendPhoto = () => {
    fetch(SERVER_PATH + '/hemodialysis-memo', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      },
      method: 'POST',
      body: createFormData(photo, {memo, date}),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const {isSuccess, message} = res;

        if (isSuccess) {
          // navigation.goBack();
          navigation.navigate('Calendar', {isSaveSuccess: true});
        } else {
          Alert.alert('오류 발생', message);
        }
      })
      .catch((err) => {
        Alert.alert(
          '오류 발생',
          '메모 작성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
        );
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{date}</Text>
      <Text>메모 및 사진</Text>
      <TextInput
        style={{
          marginVertical: 20,
          borderRadius: 20,
          height: 200,
          width: '80%',
          backgroundColor: 'white',
          fontSize: 20,
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        multiline={true}
        placeholder={'메모를 입력해주세요'}
        value={memo}
        onChangeText={(value) => handleChangeMemo(value)}
      />
      <TouchableOpacity
        style={{
          width: '80%',
          borderRadius: 20,
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'skyblue',
        }}
        onPress={() => handlePressShowImagePicker()}>
        {photo ? (
          <Image
            source={{
              uri: photo ? photo.uri : Image.resolveAssetSource(no_user).uri,
            }}
            style={{
              resizeMode: 'stretch',
              borderRadius: 20,
              width: '100%',
              height: 300,
            }}
          />
        ) : (
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
            사진 첨부하기
          </Text>
        )}
      </TouchableOpacity>

      {/* <Button title="이미지" onPress={() => handlePressShowImagePicker()} /> */}
      <Button title="저장하기" onPress={() => sendPhoto()} />
      <Button
        title="뒤로가기"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

export default function Hemodialysis() {
  const userToken = useSelector((state) => state.userToken);

  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen
        name="Calendar"
        component={AgendaScreen}
        initialParams={{userToken: userToken}}
      />
      <Stack.Screen
        name="InputMemo"
        component={InputMemo}
        initialParams={{userToken: userToken}}
      />
    </Stack.Navigator>
  );
}
