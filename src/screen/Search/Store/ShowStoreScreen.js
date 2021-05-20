import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
  ScrollView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {requestFoodStored} from '../../../actions';
import StoreHeader from './StoreHeader';

export default function ShowStore() {
  const dispatch = useDispatch();

  const goal = useSelector((state) => state.user.goal);
  const MyStore = useSelector((state) => state.storeFood);

  useEffect(() => {
    dispatch(requestFoodStored());
  }, []);

  return (
    <View style={{flex: 2}}>
      {MyStore === undefined ? (
        <Text>저장된 식사가 없습니다. </Text>
      ) : (
        <StoreHeader storefood={MyStore} goal={goal} />
      )}
    </View>
  );
}
