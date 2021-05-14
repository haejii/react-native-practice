import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react/cjs/react.development';

import FoodController from '../../../controller/FoodController';
import {DietScreenStyle} from '../../../style/styles';
import NativeButton from 'apsl-react-native-button';
import FoodInformationModal from '../firstTab/FoodInformationModal';
import {storeFood} from '../../../actions';
import NuturitionBarChart from '../../../moduleComponent/NuturitionBarChart';
import MakeStoreFood from './MakeStoreFoodScreen';
import ShowStore from './ShowStoreScreen';

export default function StoreScreen() {
  const storedFood = useSelector((state) => state.storedFood);

  return (
    <View style={{flex: 1, margin: 10}}>
      <ShowStore />
      <MakeStoreFood />
    </View>
  );
}
