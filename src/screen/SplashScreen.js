import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {ScreenStyles, SplashScreenStyles} from '../style/styles';

export default function SplashScreen({text}) {
  return (
    <View style={ScreenStyles.container}>
      <Text style={SplashScreenStyles.loading}>Loading...</Text>
      <Text style={SplashScreenStyles.text}>{text}</Text>
      <ActivityIndicator
        size="large"
        color="green"
        animating={true}
        style={SplashScreenStyles.indicator}
      />
    </View>
  );
}
