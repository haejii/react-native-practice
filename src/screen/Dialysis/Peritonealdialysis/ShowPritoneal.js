import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {memo, useState} from 'react/cjs/react.development';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTransgender} from '@fortawesome/free-solid-svg-icons';
import weekNumberByMonth from '../../../moduleComponent/WeekFormat';
import WeekDay from '../../../moduleComponent/WeekDay';
import {first} from 'lodash';
import breckfast from '../../../../assets/image/test.jpg';
import {ScrollView} from 'react-native-gesture-handler';
import {getPeritoneuMemo} from '../../../actions';
import UpdatePeritoneal from './UpdatePeritoneal';

export default function ShowPeritoneal({navigation}) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [type, setType] = useState(2);
  const items = useSelector((state) => state.items);

  let firstDate = WeekDay(new Date()).firstDay;
  let lastDate = WeekDay(new Date()).lastDay;

  let formattedSelectedDate1 = `${firstDate.getFullYear()}-${
    firstDate.getMonth() + 1
  }-${firstDate.getDate()}`;

  let formattedSelectedDate2 = `${lastDate.getFullYear()}-${
    lastDate.getMonth() + 1
  }-${lastDate.getDate()}`;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
    setDay(currentDate.getDate());

    firstDate = WeekDay(currentDate).firstDay;
    lastDate = WeekDay(currentDate).lastDay;

    formattedSelectedDate1 = `${firstDate.getFullYear()}-${
      firstDate.getMonth() + 1
    }-${firstDate.getDate()}`;

    formattedSelectedDate2 = `${lastDate.getFullYear()}-${
      lastDate.getMonth() + 1
    }-${lastDate.getDate()}`;

    console.log(formattedSelectedDate1);
    console.log(formattedSelectedDate2);
    dispatch(getPeritoneuMemo(formattedSelectedDate1, formattedSelectedDate2));

    setShow(!show);
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    dispatch(getPeritoneuMemo(formattedSelectedDate1, formattedSelectedDate2));
  }, []);

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

      {items !== undefined ? (
        <View>
          <ScrollView>
            {Object.keys(items).map((key, i) => {
              let date = new Date(items[key]?.['exchangeTime']);

              let dates = `${date.getFullYear()}년 ${
                date.getMonth() + 1
              }월 ${date.getDate()}일`;

              let time = `${date.getHours()} : ${date.getMinutes()}`;

              return items[key]['photo'] === null ? (
                items[key]['memo'] === null ? (
                  <View style={{margin: 10}}>
                    <Text
                      style={{
                        fontFamily: 'NotoSansKR-Medium',
                        fontSize: 17,
                      }}>
                      {dates}
                    </Text>
                    <TouchableOpacity
                      onPress={
                        (navigation.navigate('Update'), console.log('누름'))
                      }>
                      <View
                        style={{
                         //borderRadius: 10,
                          borderWidth: 1,
                         //borderColor: '#757575',
                          backgroundColor: '#'
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
                            <Text style={{fontSize: 18}}>
                              {' '}
                              {items[key]?.['degree']}
                            </Text>
                          </View>
                        </View>

                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontFamily: 'NotoSansKR-Medium',
                              fontSize: 15,
                            }}>
                            메모
                          </Text>
                          <Text>{items[key]?.['memo']}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{margin: 10}}>
                    <Text
                      style={{
                        fontFamily: 'NotoSansKR-Medium',
                        fontSize: 17,
                      }}>
                      {dates}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Update', {
                          names: [items[key]],
                        });
                      }}>
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
                              {time}
                            </Text>
                            <View style={{marginTop: 5}}>
                              {items[key]?.['dialysisTypeId'] === 1 ? (
                                <Text style={{fontSize: 15}}>일반복막투석</Text>
                              ) : (
                                <Text style={{fontSize: 15}}>기계투석</Text>
                              )}
                            </View>
                          </View>

                          {items[key]?.['dialysisTypeId'] === 1 && (
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
                              <Text style={{fontSize: 18}}>
                                {items[key]?.['degree']}차
                              </Text>
                            </View>
                          )}
                        </View>

                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontFamily: 'NotoSansKR-Medium',
                              fontSize: 15,
                            }}>
                            메모
                          </Text>
                          <Text>{items[key]?.['memo']}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              ) : items[key]['memo'] === null ? (
                <Text>사진 있고 메모 없음</Text>
              ) : (
                <Text>사진 있고 메모 있음</Text>
              );

              // <View style={{margin: 20}} key={key + i}>
              //   <TouchableOpacity style={{backgroundColor: 'skyblue'}}>
              //     <Text>{items[key]?.['recordDate']} </Text>
              //   </TouchableOpacity>
              // </View>
            })}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text>없당</Text>
        </View>
      )}
      <ScrollView>
        <View></View>
      </ScrollView>
    </View>
  );
}
