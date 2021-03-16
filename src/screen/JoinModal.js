import React, {Component, useState} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import NativeButton from 'apsl-react-native-button';
import {ScreenStyles, SignInScreenStyles} from '../style/styles';
import Modal from 'react-native-modal';


function JoinModal() {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
      return (
        <View>
            <NativeButton
            //isLoading={isLoading}
            style={SignInScreenStyles.loginButton}
            textStyle={SignInScreenStyles.loginButtonText}
            activeOpacity={1}
            onPress={toggleModal}>회원가입</NativeButton>
        
          <Modal isVisible={isModalVisible}>
            <View style={{flex: 0.5}}>
              <Text>Hello!</Text>
              <TextInput
              
              >

              </TextInput>
              <Button title="Hide modal" onPress={toggleModal} />
            </View>
          </Modal>
        </View>
      );
  }
  
  export default JoinModal;
