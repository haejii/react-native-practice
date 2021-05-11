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
import ShowStoreFood from './ShowStoreFoodScreen';

export default function StoreScreen() {
  const storedFood = useSelector((state) => state.storedFood);
  const [basketName, setBasketName] = useState('');
  const {goal} = useSelector((state) => state.user);

  const calorie = storedFood
    .map((storeFoods) => +storeFoods.calorie)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const protein = storedFood
    .map((storeFoods) => +storeFoods.protein)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const phosphorus = storedFood
    .map((storeFoods) => +storeFoods.phosphorus)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const potassium = storedFood
    .map((storeFoods) => +storeFoods.potassium)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const sodium = storedFood
    .map((storeFoods) => +storeFoods.sodium)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(3);

  const handlePressRemove = () => {};

  return (
    <View style={{flex: 1, margin: 10}}>
      <ShowStoreFood />
      <MakeStoreFood />
    </View>
    // <View style={{flex: 1}}>
    //   <View style={{flex: 3}}>
    //     <ScrollView>
    //       <View
    //         style={{
    //           flex: 1,
    //           width: '100%',
    //           paddingVertical: 40,
    //           paddingHorizontal: 20,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}>
    //         {FoodController.findFoodsByIds(storedFood).map((food, idx) => {
    //           return (
    //             <FoodInformationModal food={food} key={idx} type={'stored'} />
    //           );
    //         })}
    //       </View>
    //     </ScrollView>
    //   </View>
    // </View>
  );
}
