import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function NuturitionBarChart({nuturition}) {
  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartOutline}>
        <View style={styles.chartContent(nuturition)} />
      </View>
      <Text style={styles.chartText}>
        {((nuturition / 2000) * 100).toFixed(1)}%
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
    width: '80%',
    height: 30,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
  },
  chartContent: (nuturition) => {
    return {
      width: `${nuturition === 0 ? 0 : (nuturition / 2000) * 100}%`,
      height: '100%',
      backgroundColor: (nuturition / 2000) * 100 > 80 ? 'red' : 'skyblue',
    };
  },
  chartText: {
    marginLeft: 10,
    fontSize: 20,
  },
});
