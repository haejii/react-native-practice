import React from 'react';
import { View , Text, Button, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { changeJoinField } from '../actions';
import { SERVER_PATH } from '../service/apis';
import { SignInScreenStyles } from '../style/styles';
import NativeButton from 'apsl-react-native-button';

export default function JoinScreen({navigation}){

    const dispatch = useDispatch();

    //const isLoading = useSelector((state) => state.JoinField.isLoding);


    const email = useSelector((state)=>state.JoinFields.email);
    const password = useSelector((state) => state.JoinFields.password);
    const nickname = useSelector((state)=>state.JoinFields.nickname);
    const height = useSelector((state)=>state.JoinFields.height);
    const weight = useSelector((state)=>state.JoinFields.weight);
    const gender = useSelector((state)=>state.JoinFields.gender);
    const birth = useSelector((state)=>state.JoinFields.birth);
    const kidneyType = useSelector((state)=>state.JoinFields.kidneyType);



    function handleChangJoinField(name, value){
        dispatch(changeJoinField(name, value));

    }


    // function handlePressJoinUp(){
    //     if(!email || !password || !nickname || !height || !weight || !gender || !birth || !kidneyType){
    //         return Alert.alert('회원가입 오류', '체크하지 않은 부분이 있습니다.');
    //     }
    // }


    function handlePressJoin(){
        if(!email || !password || !nickname || !height || !weight || !gender || !birth || !kidneyType){
            return Alert.alert('회원가입 오류', '기입 하지 않은 부분이 있습니다.');
        }
        fetch(SERVER_PATH + '/user', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST', 
            mode : 'cors',
            credentials: 'include', 
            body: JSON.stringify({
                email,
                password,
                nickname, 
                height, 
                weight, 
                gender,
                kidneyType,
                birth,
            }),
        })

            .then((res) => res.json())
            .then((response) => console.log(response));
            navigation.navigate('SignIn');
        }
    
    return(
        <View>
        <View>
            <Text>회원가입</Text>
        </View>

        <View>
            <TextInput
                style={SignInScreenStyles.loginField}
                placeholder = "Email"
                value = {email}
                onChangeText={(value)=>handleChangJoinField('email', value)}
            />

            <TextInput
                style={SignInScreenStyles.loginField}
                placeholder="password"
                value = {password}
                onChangeText={(value)=>handleChangJoinField('password', value)}
            />


         
            <TextInput
                style={SignInScreenStyles.loginField}
                placeholder = "nickname"
                value = {nickname}
                onChangeText={(value)=>handleChangJoinField('nickname', value)}
             />

           
            <TextInput
                style={SignInScreenStyles.loginField}
                placeholder = "height"
                value = {height}
                onChangeText={(value)=>handleChangJoinField('height', value)}
             />     

            <TextInput
                style={SignInScreenStyles.loginField}
                placeholder = "weight"
                value = {weight}
                onChangeText={(value)=>handleChangJoinField('weight', value)}
             />

            <TextInput
                style={SignInScreenStyles.loginField}
                placeholder = "gender"
                value = {gender}
                onChangeText={(value)=>handleChangJoinField('gender', value)}
             />

            <TextInput
                style={SignInScreenStyles.loginField}
                placeholder = "birth"
                value = {birth}
                onChangeText={(value)=>handleChangJoinField('birth', value)}
             />

            <TextInput
                style={SignInScreenStyles.loginField}
                placeholder = "kidneyType"
                value = {kidneyType}
                onChangeText={(value)=>handleChangJoinField('kidneyType', value)}
             />

        </View>

            {/* <Button onPress={()=>{handlePressJoin();}}>
            회원가입</Button> */}

            <NativeButton
               // onPress={()=>navigation.navigate('SignIn')}
                onPress={()=>{handlePressJoin();}}
            >
                회원가입
            </NativeButton>

            

        </View>

    )

}