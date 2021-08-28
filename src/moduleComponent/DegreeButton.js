import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import NativeButton from 'apsl-react-native-button';

export default function DegreeButton() {
  return (
  
             <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                <NativeButton style={{width: 150, marginRight: 15}}>1차</NativeButton>
                <NativeButton style={{width: 150}}>2차</NativeButton>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center', justifyContent: 'center'
                }}>
          
                <NativeButton style={{width: 150, marginRight: 15}}>3차</NativeButton>
                <NativeButton style={{width: 150}}>4차</NativeButton>
              </View>

  );
}

