import React from 'react';

import AgendaScreen from '../../../moduleComponent/AgendaScreen';
import {createStackNavigator} from '@react-navigation/stack';

import PeritonealdialysisSub from './PeritonealdialysisSub';
import UpdateGeneralDialysis from './UpdateGeneralDialysis';
import UpdateMachineDialysis from './UpdateMachineDialysis';
import PeritonealDialysisFirst from './PeritonealDialysisFirst';
import UpdatePeritoneal from './UpdatePeritoneal';

const Stack = createStackNavigator();

export default function PeritonealdialysisMain2() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Main" component={PeritonealDialysisFirst} />
      <Stack.Screen name="Update" component={UpdatePeritoneal} />
    </Stack.Navigator>
  );
}
