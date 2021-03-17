import React, { useEffect, useState } from 'react';
import { View , Text, Button, Alert, ScrollView, requireNativeComponent, Picker} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { changeJoinField, changeLoginField } from '../actions';
import { SERVER_PATH } from '../service/apis';
import { SignInScreenStyles, JoinScreenStyles, ScreenStyles } from '../style/styles';
import NativeButton from 'apsl-react-native-button';
import RNPickerSelect from 'react-native-picker-select';
import JoinCompleteScreen from '../screen/JoinCompleteScreen';


export default function JoinScreen({navigation}){

    const dispatch = useDispatch();


    const email = useSelector((state)=>state.JoinFields.email);
    const password = useSelector((state) => state.JoinFields.password);
    const nickname = useSelector((state)=>state.JoinFields.nickname);
    const height = useSelector((state)=>state.JoinFields.height);
    const weight = useSelector((state)=>state.JoinFields.weight);
    const gender = useSelector((state)=>state.JoinFields.gender);
    const birth = useSelector((state)=>state.JoinFields.birth);
    const kidneyType = useSelector((state)=>state.JoinFields.kidneyType);
    const activityId = useSelector((state)=>state.JoinFields.activityId);
    const [initialKidney, setKidney] = useState('');

    const placeholder = {
    label: '건강상태를 입력해주세요. ',
    value: null,
    color: '#9EA0A4',
    };

    const placeholder2 = {
        label: '활동상태를 입력해주세요. ', 
        value: null, 
        color: '#9EA044'
    }

    function handleChangJoinField(name, value){      
        dispatch(changeJoinField(name, value));
    }


    function handleGenderField(){
    
        dispatch(changeJoinField('gender', 'M'));
        console.log(gender);
    }

    function handleGenderField2(){
    
        dispatch(changeJoinField('gender', 'F'));
        console.log(gender);
    }

    function handelPressEmailCheck(){
    if(!email){
            return Alert.alert('이메일 오류', '이메일을 입력하세요.');
    }
    fetch(SERVER_PATH + '/Emailcheck', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST', 
        mode : 'cors',
        credentials: 'include', 
        body: JSON.stringify({
            email
        }),
    })

        .then((res) => res.json())
        .then((response) => 
        {if(response.isSuccess === false){
            return Alert.alert('중복', '중복된 이메일입니다.');
        }else{
            return Alert.alert('사용가능', '사용가능 이메일 입니다.');
        }}
        );

    }


    function handelPressNickNameCheck(){
        if(!nickname){
                return Alert.alert('닉네임 오류', '닉네임을 입력하세요.');
        }
        fetch(SERVER_PATH + '/nicknameCheck', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST', 
            mode : 'cors',
            credentials: 'include', 
            body: JSON.stringify({
                nickname
            }),
        })
    
            .then((res) => res.json())
            .then((response) => 
            {if(response.isSuccess == false){
                return Alert.alert('중복', '중복된 닉네임입니다.');
            }else{
                return Alert.alert('사용가능', '사용가능 닉네임 입니다.');
            }}
            );
    
        }


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
                activityId,
            }),
        })

            .then((res) => res.json())
            .then((response) => console.log(response));
            navigation.navigate('JoinCompleteScreen');
        }

        useEffect(() => {
            console.log(kidneyType);
        }, [kidneyType])
    
    return(
        <ScrollView>
        <View style={ScreenStyles.container}>
        <View style={{flex: 1, alignItems: 'center'}}> 
            <Text>회원가입</Text>
        </View>

        <View style={{flex: 3, alignItems: 'center', width: '100%'}}>
            <View style={JoinScreenStyles.ViewContainer}>
            <Text>아이디  </Text>
            <TextInput
                style={JoinScreenStyles.JoinField}
                placeholder = "Email"
                value = {email}
                onChangeText={(value)=>handleChangJoinField('email', value)}
            />
            <NativeButton
                style={JoinScreenStyles.checkIdBtn}    
                onPress={()=>{handelPressEmailCheck();}}
            >
                이메일 중복확인
            </NativeButton>
            </View>

            <View style={JoinScreenStyles.ViewContainer}>
                <Text>비밀번호  </Text>
           
            <TextInput
                style={JoinScreenStyles.JoinField}
                placeholder="password"
                value = {password}
                onChangeText={(value)=>handleChangJoinField('password', value)}
            />
            </View>


            <View  style={JoinScreenStyles.ViewContainer}>
            <Text>닉네임 </Text>
            <TextInput
                style={JoinScreenStyles.JoinField}
                placeholder = "nickname"
                value = {nickname}
                onChangeText={(value)=>handleChangJoinField('nickname', value)}
             />
            <NativeButton
                style={JoinScreenStyles.checkIdBtn}    
                onPress={()=>{handelPressNickNameCheck();}}
            >
                닉네임 중복확인
            </NativeButton>
             </View>

            <View style={JoinScreenStyles.ViewContainer}>
            <Text>키(cm)  </Text>
            <TextInput
                style={JoinScreenStyles.JoinField}
                placeholder = "height"
                value = {height}
                onChangeText={(value)=>handleChangJoinField('height', value)}
             />     
            </View>

            <View style={JoinScreenStyles.ViewContainer}>
            <Text>몸무게(kg)  </Text>
            <TextInput
                style={JoinScreenStyles.JoinField}
                placeholder = "weight"
                value = {weight}
                onChangeText={(value)=>handleChangJoinField('weight', value)}
             />
             </View>

             <View style={JoinScreenStyles.ViewContainer}>
                 <Text>성별</Text>
                 <View style={JoinScreenStyles.GenderButtonContainer}>
                
          
                 <NativeButton 
                 style={JoinScreenStyles.GenderButton}
                 textStyle={JoinScreenStyles.GenderButtonText}
                 activeOpacity={0.5}
                 onPress={() => {handleGenderField()}}>
                 남자</NativeButton>

                 <NativeButton 
                 style={JoinScreenStyles.GenderButton}
                 textStyle={JoinScreenStyles.GenderButtonText}
                 activeOpacity={0.5}
                 onPress={() => {handleGenderField2()}}>
                 여자</NativeButton>
                 </View>

             </View>
          
            <View style={JoinScreenStyles.ViewContainer}>
            <Text>생년월일  </Text>
            <TextInput
                style={JoinScreenStyles.JoinField}
                placeholder = "birth"
                value = {birth}
                onChangeText={(value)=>handleChangJoinField('birth', value)}
             />
            <Text>예시: 19980101</Text>
             </View>

            
            <View style={JoinScreenStyles.ViewContainer}>
            <Text>건강상태   </Text>
                    <RNPickerSelect
                        
                        onValueChange={(value) => handleChangJoinField('kidneyType', value)}
                        
                        //onValueChange={(initialKidney) => setKidney(initialKidney)}
                        value={kidneyType}
                        placeholder={placeholder}
                        items={[
                        {label: '투석전단계<신증후군>', value: 1},
                        {label: '투석전단계<만성신부전>', value: 2},
                        {label: '신장이식<신장이식후~8주>', value: 3},
                        {label: '신장이식<신작이식8주후>', value: 4},
                        {label: '혈액투석', value:5},
                        {label: '복막투석', value:6},
                        {label: '해당없음', value:7}
                    ]}
                    />

            </View>

            <View style={JoinScreenStyles.ViewContainer}>
            <Text>활동상태   </Text>
            <RNPickerSelect
                        
                        onValueChange={(value) => handleChangJoinField('activityId', value)}
                        placeholder={placeholder2}
                        value={activityId}
                        items={[
                        {label: '비활동적', value: 1},
                        {label: '저활동적', value: 2},
                        {label: '활동적', value: 3},
                        {label: '매우 활동적', value: 4},
                        
                    ]}
                    />
            </View>

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
        </ScrollView>

    )

}