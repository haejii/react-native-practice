import React from 'react';

import AgendaScreen from '../../../moduleComponent/AgendaScreen';
import {createStackNavigator} from '@react-navigation/stack';

import PeritonealdialysisSub from './PeritonealdialysisSub';
import UpdateGeneralDialysis from './UpdateGeneralDialysis';
import UpdateMachineDialysis from './UpdateMachineDialysis';

const Stack = createStackNavigator();

export default function PeritonealdialysisMain() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Calendar" component={AgendaScreen} />
      <Stack.Screen name="InputMemo" component={PeritonealdialysisSub} />
      <Stack.Screen name="UpdateMemo" component={UpdateGeneralDialysis} />
      <Stack.Screen name="UpdateMemo2" component={UpdateMachineDialysis} />
    </Stack.Navigator>
  );
}
