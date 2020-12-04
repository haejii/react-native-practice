import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeIsLoading,
  changeLoginField,
  clearUserToken,
  requestLogin,
  setUserToken,
} from '../actions';
import {loadItem} from '../utils/asyncStorage';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}

function HomeScreen() {
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.userToken);

  function handlePressSignOut() {
    dispatch(clearUserToken());
  }

  useEffect(() => {
    console.log('homescreen effect', userToken);
  }, [userToken]);

  return (
    <View style={styles.container}>
      <Text>Signed in! {userToken}</Text>
      <Button title="Sign out" onPress={() => handlePressSignOut()} />
    </View>
  );
}

function SignInScreen() {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.loginFields.username);
  const password = useSelector((state) => state.loginFields.password);

  function handleChangeLoginField(name, value) {
    dispatch(changeLoginField(name, value));
  }

  function handlePressSignIn() {
    if (!username || !password) {
      return Alert.alert('로그인 오류', '아이디 또는 패스워드가 비어있습니다');
    }
    dispatch(requestLogin(username, password));
  }

  useEffect(() => {}, [username, password]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.loginField}
        placeholder="Username"
        value={username}
        onChangeText={(value) => handleChangeLoginField('username', value)}
      />
      <TextInput
        style={styles.loginField}
        placeholder="Password"
        value={password}
        onChangeText={(value) => handleChangeLoginField('password', value)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton}>
        <Button
          color="white"
          title="Sign in"
          onPress={() => handlePressSignIn()}
        />
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

export default function AuthenticationFlow({navigation}) {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);
  const accessToken = useSelector((state) => state.userToken);

  useEffect(() => {
    async function getToken() {
      const userToken = await loadItem('userToken');
      console.log(userToken);

      if (userToken) {
        dispatch(setUserToken(userToken));
      }

      dispatch(changeIsLoading(false));
    }
    getToken();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : accessToken == null ? (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign in',
              animationTypeForReplace: !accessToken ? 'pop' : 'push',
            }}
          />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginField: {
    width: '80%',
    backgroundColor: 'white',
    height: '5%',
    fontSize: 16,
    marginBottom: '1%',
  },
  loginButton: {
    marginTop: '2%',
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'teal',
  },
  loading: {
    fontSize: 24,
    fontWeight: '800',
  },
});
