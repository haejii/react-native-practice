import React from 'react';
import { View , Text, Button, Alert, ScrollView, requireNativeComponent, Picker} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import NativeButton from 'apsl-react-native-button';


export default function JoinCompleteScreen({navigation}){

    return(
        <View>
            <Text>회원가입 완료</Text>
            <NativeButton onPress={() => navigation.navigate('SignIn')}>
                로그인하러가기
            </NativeButton>
            
        </View>
    )


}