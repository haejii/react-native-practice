import React from 'react';
import {View} from 'react-native';
import {SearchResultStyles} from '../style/styles';
import FoodInformationModal from './FoodInformationModal';

export default function SearchResult({result}) {
  return (
    <View style={SearchResultStyles.searchResultContainer}>
      {result.map((food, idx) => (
        <FoodInformationModal food={food} key={idx} />
      ))}
    </View>
  );
}
