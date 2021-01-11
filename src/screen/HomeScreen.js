import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BarChart, Grid} from 'react-native-svg-charts';
import {Text as SVGText} from 'react-native-svg';

import styles from '../style/styles';
import {useSelector} from 'react-redux';

export default function HomeScreen() {
  const data = [50, 10, 40, 95, 85];

  const CUT_OFF = 50;
  const Labels = ({x, y, bandwidth, d}) =>
    d.map((value, index) => (
      <>
        <SVGText
          key={index}
          x={value > CUT_OFF ? x(0) + 10 : x(value) + 10}
          y={y(index) + bandwidth / 2}
          fontSize={20}
          fill={value > CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}>
          {value}
        </SVGText>
      </>
    ));

  const handlePressMealButton = (num) => {
    console.log(num);
  };

  const nuturition = useSelector((state) => state.nuturition);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          height: 300,
          paddingVertical: 30,
          flex: 2,
          // width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <BarChart
          style={{flex: 1, marginLeft: 8, width: '80%'}}
          data={data}
          horizontal={true}
          svg={{fill: 'rgba(134, 165, 244, 0.9)'}}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          gridMin={0}>
          <Grid direction={Grid.Direction.VERTICAL} />
          <Labels d={data} />
        </BarChart> */}
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
          오늘의 목표
        </Text>

        <Text style={{fontSize: 20}}>
          칼로리: {nuturition.calorie} / 2000 kcal
        </Text>
        <Text style={{fontSize: 20}}>단백질: {nuturition.protein} / 85 g</Text>
        <Text style={{fontSize: 20}}>
          나트륨: {nuturition.sodium} / 2000 mg
        </Text>
        <Text style={{fontSize: 20}}>인: {nuturition.phosphorus} / 800 mg</Text>
        <Text style={{fontSize: 20}}>
          칼륨: {nuturition.potassium} / 2000 mg
        </Text>
      </View>
      <View style={{flex: 3, width: '100%', height: '100%'}}>
        <View style={styles.mealButtonContainer}>
          <TouchableOpacity
            style={styles.mealButton}
            onPress={() => handlePressMealButton(1)}>
            <Text style={{fontSize: 24}}>아침</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mealButton}
            onPress={() => handlePressMealButton(2)}>
            <Text style={{fontSize: 24}}>점심</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mealButtonContainer}>
          <TouchableOpacity
            style={styles.mealButton}
            onPress={() => handlePressMealButton(3)}>
            <Text style={{fontSize: 24}}>저녁</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mealButton}
            onPress={() => handlePressMealButton(0)}>
            <Text style={{fontSize: 24}}>간식</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
