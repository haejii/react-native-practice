import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import GeneralDialysis from './GeneralDialysisScreen';
import Machinedialysis from './MachinedialysisScreen';
import GeneralDialysis2 from './GeneralDialysisScreen2';
import Machinedialysis2 from './MachinedialysisScreen2';
import Test from './Test';

const Tab = createMaterialTopTabNavigator();

export default function PeritonealDialysisFirst({Navigation}) {
  return (
    <Tab.Navigator initialRouteName="GeneralDialysis">
      <Tab.Screen
        name="GeneralDialysis"
        component={GeneralDialysis2}
        options={{tabBarLabel: '투석 기록 내역'}}
      />
      <Tab.Screen
        name="test"
        component={Test}
        options={{tabBarLabel: 'test 작성'}}
      />
      <Tab.Screen
        name="GenetalDialysis"
        component={Machinedialysis2}
        options={{tabBarLabel: '복막일지 작성'}}
      />
    </Tab.Navigator>
  );
}
