import React from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import FoodController from '../../controller/FoodController';

import FoodInformationModal from './firstTab/FoodInformationModal';

export default function StoredFood() {
  const storedFood = useSelector((state) => state.storedFood);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              width: '100%',
              paddingVertical: 40,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {FoodController.findFoodsByIds(storedFood).map((food, idx) => {
              return (
                <FoodInformationModal food={food} key={idx} type={'stored'} />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
