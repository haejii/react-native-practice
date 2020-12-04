import React from 'react';
import {Text, View} from 'react-native';
import styles from '../style/styles';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}
