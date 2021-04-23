import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

import MachineDialysis from './MachinedialysisScreen';
import GeneralDialysis from './GeneralDialysisScreen';
import AgendaScreen from './Calende';
import Hemodialysis from './Hemodialysis/Hemodialysis';
import {useSelector} from 'react-redux';
import kidneyTypes from '../../utils/kidneyType';

const Tab = createMaterialTopTabNavigator();

export default function DialysisScreen() {
  const kidneyType = useSelector((state) => state.user.kidneyType);

  if (kidneyTypes[kidneyType] === '복막투석') {
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

  return <Hemodialysis />;
}
