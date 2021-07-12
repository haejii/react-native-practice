import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

import Hemodialysis from './Hemodialysis/Hemodialysis';
import {useSelector} from 'react-redux';
import kidneyTypes from '../../utils/kidneyType';
import Peritonealdialysis from './Peritonealdialysis/PeritonealdialysisMain';
import Hemodialysis2 from './Hemodialysis/Hemodialysis2';
import PeritonealdialysisMain2 from './Peritonealdialysis/PeritonealdialysisMain2';
const Tab = createMaterialTopTabNavigator();

export default function DialysisScreen() {
  const kidneyType = useSelector((state) => state.user.kidneyType);

  if (kidneyTypes[kidneyType] === '복막투석') {
    //   return <Peritonealdialysis />;
    return <PeritonealdialysisMain2 />;
  }

  //return <Hemodialysis />;
  return <Hemodialysis2 />;
}
