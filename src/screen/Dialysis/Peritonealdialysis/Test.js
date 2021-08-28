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

import UpdatePeritoneal from './UpdatePeritoneal';
import ShowPeritoneal from './ShowPritoneal';

export default function Test({navigation}) {
  const dispatch = useDispatch();

  return <ShowPeritoneal navigation={navigation} />;
}
