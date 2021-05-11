import React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react/cjs/react.development';
import {requestFoodStored} from '../../../actions';

export default function ShowStoreFood() {
  const dispatch = useDispatch();

  const handlePressSelectCategory = () => {};

  useEffect(() => {
    dispatch(requestFoodStored());
  }, []);

  return (
    <View style={{flex: 2}}>
      <ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: 'skyblue',
            width: '100%',
            padding: 10,
            borderRadius: 10,
            marginBottom: 5,
          }}
          onPress={() => handlePressSelectCategory()}>
          <Text style={{textAlign: 'center'}}>자주 먹는 아침밥</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
