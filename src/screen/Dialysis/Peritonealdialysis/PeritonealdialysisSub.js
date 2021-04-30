import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import GeneralDialysis from './GeneralDialysisScreen';
import Machinedialysis from './MachinedialysisScreen';

const Tab = createMaterialTopTabNavigator();

export default function PeritonealdialysisSub({
  route: {
    params: {date},
  },
}) {
  return (
    <Tab.Navigator initialRouteName="GeneralDialysis">
      <Tab.Screen
        name="GeneralDialysis"
        component={GeneralDialysis}
        initialParams={{date}}
        options={{tabBarLabel: '일반복막투석'}}
      />
      <Tab.Screen
        name="GenetalDialysis"
        component={Machinedialysis}
        initialParams={{date}}
        options={{tabBarLabel: '기계복막투석'}}
      />
    </Tab.Navigator>
  );
}
