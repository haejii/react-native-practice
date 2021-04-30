import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

import Hemodialysis from './Hemodialysis/Hemodialysis';
import {useSelector} from 'react-redux';
import kidneyTypes from '../../utils/kidneyType';
import Peritonealdialysis from './Peritonealdialysis/PeritonealdialysisMain';

const Tab = createMaterialTopTabNavigator();

export default function DialysisScreen() {
  const kidneyType = useSelector((state) => state.user.kidneyType);

  if (kidneyTypes[kidneyType] === '복막투석') {
    return <Peritonealdialysis />;
  }

  return <Hemodialysis />;
}
