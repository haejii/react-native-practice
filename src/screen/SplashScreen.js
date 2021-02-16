import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import styles from '../style/styles';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Loading...</Text>
      <ActivityIndicator
        size="large"
        color="green"
        animating={true}
        style={{paddingTop: '10%'}}
      />
    </View>
  );
}
