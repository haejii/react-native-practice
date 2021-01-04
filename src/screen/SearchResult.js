import React from 'react';
import {View} from 'react-native';
import FoodInformationModal from './FoodInformationModal';

export default function SearchResult({result}) {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {result.map((food, idx) => (
        <FoodInformationModal food={food} />
      ))}
    </View>
  );
}
