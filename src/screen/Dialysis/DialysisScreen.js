import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useState} from 'react/cjs/react.development';
import {DialysisScreenStyle, JoinScreenStyles} from '../../style/styles';
import ImagePicker from 'react-native-image-picker';
import no_user from '../../../assets/image/no_user.png';
import NativeButton from 'apsl-react-native-button';
import MachineDialysis from './MachinedialysisScreen';
import GeneralDialysis from './GeneralDialysisScreen';
import DialysisCalendar from './DialysisCalendar';
import AgendaScreen from './Calende';

const Tab = createMaterialTopTabNavigator();

export default function DialysisScreen() {
  return (
    <Tab.Navigator initialRouteName="Canlendar">
      <Tab.Screen
        name="Canlendar"
        component={AgendaScreen}
        options={{tabBarLabel: '달력'}}
      />
      <Tab.Screen
        name="GenetalDialysis"
        component={GeneralDialysis}
        options={{tabBarLabel: '일반복막투석'}}
      />
      <Tab.Screen
        name="MachineDialysis"
        component={MachineDialysis}
        options={{tabBarLabel: '기계복막투석'}}
      />
    </Tab.Navigator>
  );
}
