import React, {useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import NuturitionBarChart from '../../../moduleComponent/NuturitionBarChart';
import {DietModalStyles} from '../../../style/styles';
import StoreModal from './StoreModal';

export default function StoreHeader({storefood, goal}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const handlePressModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePressRemove = () => {
    Alert.alert('이 메뉴를 지우겠습니까?', '', [
      {
        text: '지우기',
        onPress: () => {},
      },
      {text: '취소'},
    ]);
  };

  const handlePressAdd = () => {
    setIsOpen2(true);
  };
  return (
    <View>
      {Object.keys(storefood).map((key, i) => {
        const calorie = storefood[key]
          .map((food) => food.calorie)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const protein = storefood[key]
          .map((food) => food.protein)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const phosphorus = storefood[key]
          .map((food) => food.phosphorus)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const potassium = storefood[key]
          .map((food) => food.potassium)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        const sodium = storefood[key]
          .map((food) => food.sodium)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(3);

        return (
          <View key={i + key}>
            <StoreModal
              foods={storefood[key]}
              mealTime={key}
              nutrition={{calorie, protein, phosphorus, potassium, sodium}}
              goal={goal}
            />
          </View>
        );
      })}
    </View>
  );
}
