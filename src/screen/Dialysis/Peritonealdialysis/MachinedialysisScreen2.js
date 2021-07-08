import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useState} from 'react/cjs/react.development';
import {DialysisScreenStyle} from '../../../style/styles';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import NativeButton from 'apsl-react-native-button';
import {useDispatch, useSelector} from 'react-redux';
import {
  addGeneralDialysis,
  changeDialysis,
  setError,
  fetchMemos,
  clearDialysis,
} from '../../../actions';
import {useEffect} from 'react/cjs/react.development';
import DateTimePicker from '@react-native-community/datetimepicker';
import SplashScreen from '../../SplashScreen';
import errors from '../../../utils/errors';

export default function Machinedialysis2({
  navigation
}) {
  const dispatch = useDispatch();

  const kidneyType = useSelector((state) => state.user.kidneyType);
  const error = useSelector((state) => state.error);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [exchangeTime, setExchangeTime] = useState(new Date());
  const [hour, setHour] = useState(exchangeTime.getHours());
  const [min, setMin] = useState(exchangeTime.getMinutes());

  const [btn, setBtn] = useState(1);

  const dialysis = useSelector((state) => state.dialysis);
  const dialysisType = 1;

  function handleChangDialysis(name, value) {
    dispatch(changeDialysis(name, value));
  }


  const a = [
  
    {"content": String(dialysis.injectionAmount), "explain" : "주입량(g)을 숫자로 입력해주세요", "name": "injectionAmount"},
    {"content": String(dialysis.drainage), "explain" : "배액량(g)을 숫자로 입력해주세요", "name":"drainage" },
    {"content": String(dialysis.dehydration), "explain" : "제수량(g)을 숫자로 입력해주세요", "name" :"dehydration" },
    {"content": String(dialysis.weight), "explain" : "몸무개를 측정하셨나요?", "name" :"weight"}
  ];
  return(
    <View style={{backgroundColor: 'white'}}>
      
      <View style={{marginLeft: 10, marginTop: 10}}>
        <Text>Calendar</Text>
      </View>
    
      <ScrollView>

      <View style={{height: 150, backgroundColor: 'skyblue', margin: 15}}>
        <Text>그래프</Text>
      </View>

      {/* <View style={{height: 50, marginTop: 10, marginLeft: 15}}>
        <Text style={{ fontFamily: 'NotoSansKR-Medium', fontSize: 17}}>기계복막투석</Text>
      </View>
       */}
      <View style={{marginLeft: 10, marginTop: 10, alignContent: 'center', justifyContent: 'center' }}>
        {/* <View style={{marginBottom: 20}}> */}

          <View>
            <Text>복막투석 방법을 선택하세요. </Text>
            <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center', justifyContent: 'center'
                }}>
          
                <NativeButton style={{width: 150, marginRight: 15, backgroundColor: btn === 1 ? 'skyblue': 'white'}} onPress={()=>setBtn(1)}>일반 복막투석</NativeButton>
                <NativeButton style={{width: 150, backgroundColor: btn === 2 ? 'skyblue': 'white'}} onPress={()=>setBtn(2)}>기계 복막 투석</NativeButton>
              </View>
           </View>
           {btn === 1? (<Text>1번이당!</Text>) : (
             <>
              <View style={{marginBottom: 15, alignContent: 'center', justifyContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
           <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}> 오늘이 몇 번째인지 선택하세요(7월 첫째주)</Text>
         </View>
             <View
             style={{
               alignItems: 'center',
               width: '100%',
               flexDirection: 'row',
               alignItems: 'center', justifyContent: 'center'
             }}>
       
             <NativeButton style={{width: 150, marginRight: 15}}>1차</NativeButton>
             <NativeButton style={{width: 150}}>2차</NativeButton>
           </View>
           <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center', justifyContent: 'center'
                }}>
          
                <NativeButton style={{width: 150, marginRight: 15}}>3차</NativeButton>
                <NativeButton style={{width: 150}}>4차</NativeButton>
              </View>

              
        {Object.keys(a).map((key, i) => {
          return(
            <View style={DialysisScreenStyle.basicView}>
            <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>{a[key]["explain"]}</Text>
            <View style={{flexDirection: 'row'}}>
            <TextInput
              style={DialysisScreenStyle.basicTextInput}
              keyboardType="numeric"
              value={a[key]["content"]}
              onChangeText={(value) =>
                handleChangDialysis(a[key]["name"], value)
              }
            />
       
            </View>
          </View>
           
           
          )
        })}
              
            

           </>
           )
}
         
          {/* <View style={{marginBottom: 15, alignContent: 'center', justifyContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}> 오늘이 몇 번째인지 선택하세요(7월 첫째주)</Text>
          </View> */}
    
                {/* <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center', justifyContent: 'center'
                }}>
          
                <NativeButton style={{width: 150, marginRight: 15}}>1차</NativeButton>
                <NativeButton style={{width: 150}}>2차</NativeButton>
              </View> */}


              {/* <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center', justifyContent: 'center'
                }}>
          
                <NativeButton style={{width: 150, marginRight: 15}}>3차</NativeButton>
                <NativeButton style={{width: 150}}>4차</NativeButton>
              </View>*/}
              {/* </View>  */}
{/* 
        {Object.keys(a).map((key, i) => {
          return(
            <View style={DialysisScreenStyle.basicView}>
            <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>{a[key]["explain"]}</Text>
            <View style={{flexDirection: 'row'}}>
            <TextInput
              style={DialysisScreenStyle.basicTextInput}
              keyboardType="numeric"
              value={a[key]["content"]}
              onChangeText={(value) =>
                handleChangDialysis(a[key]["name"], value)
              }
            />
       
            </View>
          </View>
           
           
          )
        })} */}
      </View>
      </ScrollView>
    </View>
  )
}
