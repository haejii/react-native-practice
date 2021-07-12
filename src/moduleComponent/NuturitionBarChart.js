import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';

export default function NuturitionBarChart({nuturition, goal}) {
  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartOutline}>
        <View style={styles.chartContent(nuturition, goal)} />
      </View>
      <Text style={styles.chartText}>
        {((nuturition / goal) * 100).toFixed(1)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartOutline: {
    //marginLeft: 10,
    width: '75%',
    height: Platform.OS === 'ios' ? 30 : 25,
    backgroundColor: 'white',
    borderColor: 'black',
    backgroundColor: '#F5F5F5',
    // borderWidth: 2,
    // borderRadius: 10,
  },
  chartContent: (nuturition, goal) => {
    return {
      width: `${
        (nuturition === 0 ? 0 : (nuturition / goal) * 100 > 100)
          ? 100
          : (nuturition / goal) * 100
      }%`,
      height: '100%',
      backgroundColor: (nuturition / goal) * 100 > 80 ? 'red' : 'skyblue',
    };
  },
  chartText: {
    width: '20%',
    marginLeft: 15,
    fontSize: 18,
  },
});
