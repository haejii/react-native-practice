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
import {useState} from 'react/cjs/react.development';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTransgender} from '@fortawesome/free-solid-svg-icons';
import weekNumberByMonth from '../../../moduleComponent/WeekFormat';
import WeekDay from '../../../moduleComponent/WeekDay';
import {first} from 'lodash';
import breckfast from '../../../../assets/image/test.jpg';
import {ScrollView} from 'react-native-gesture-handler';

export default function GeneralDialysis2({navigation}) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());

  let firstDate = WeekDay(new Date()).firstDay;
  let lastDate = WeekDay(new Date()).lastDay;

  let today = `${year}년 ${month}월 ${day}일`;
  let formattedToday = `${year}-${month}-${day}`;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
    setDay(currentDate.getDate());

    const formattedSelectedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    setShow(!show);
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{margin: 10}} onPress={() => showDatepicker()}>
          <FontAwesomeIcon icon={faTransgender} size={20} />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onChange}
          />
        )}
        <View style={{marginTop: 0}}>
          <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 18}}>{`${
            weekNumberByMonth(date).month
          }월 ${weekNumberByMonth(date).weekNo}주차`}</Text>
        </View>
      </View>

      <ScrollView>
        <View style={{margin: 10}}>
          <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 17}}>
            {today}
          </Text>
          <TouchableOpacity>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#757575',
                width: '97%',
                height: 180,
              }}>
              <View style={{margin: 10, flexDirection: 'row'}}>
                <View>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    오전 02:09
                  </Text>
                  <View style={{marginTop: 5}}>
                    <Text style={{fontSize: 15}}>일반 복막투석</Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#eabab0',
                    height: 30,
                    marginLeft: 150,
                    marginTop: 10,
                    width: 100,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18}}>1차</Text>
                </View>
              </View>

              <View style={{marginLeft: 10}}>
                <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>
                  메모
                </Text>
                <Text>
                  오늘 복막 투석을 함... 언제 또 하는지... 모름..오늘 복막
                  투석을 함... 언제 또 하는지... 모름..
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{margin: 10}}>
          <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 17}}>
            {today}
          </Text>
          <TouchableOpacity>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#757575',
                width: '97%',
                height: 400,
              }}>
              <View style={{margin: 10, flexDirection: 'row'}}>
                <View>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    오전 02:09
                  </Text>
                  <View style={{marginTop: 5}}>
                    <Text style={{fontSize: 15}}>일반 복막투석</Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#eabab0',
                    height: 30,
                    marginLeft: 150,
                    marginTop: 10,
                    width: 100,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18}}>1차</Text>
                </View>
              </View>

              <View style={{marginLeft: 10}}>
                <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 15}}>
                  메모
                </Text>
                <Text>
                  오늘 복막 투석을 함... 언제 또 하는지... 모름..오늘 복막
                  투석을 함... 언제 또 하는지... 모름..
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image style={{width: '90%', height: 230}} source={breckfast} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{margin: 10}}>
          <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 17}}>
            {today}
          </Text>
          <TouchableOpacity>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#757575',
                width: '97%',
                height: 100,
              }}>
              <View style={{margin: 10, flexDirection: 'row'}}>
                <View>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    오전 02:09
                  </Text>
                  <View style={{marginTop: 5}}>
                    <Text style={{fontSize: 15}}>일반 복막투석</Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#eabab0',
                    height: 30,
                    marginLeft: 150,
                    marginTop: 10,
                    width: 100,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18}}>1차</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
