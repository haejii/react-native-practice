import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import {changeIsLoading, setUser, setUserToken} from '../actions';
import {loadItem, saveItem} from '../utils/asyncStorage';
import SplashScreen from '../screen/SplashScreen';
import SignInScreen from '../screen/SignInScreen';
import HomeScreen from '../screen/HomeScreen';
import auth from '@react-native-firebase/auth';
import {convertUserData} from '../utils/convertData';

const Stack = createStackNavigator();

export default function AuthenticationFlow({navigation}) {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);
  const accessToken = useSelector((state) => state.userToken);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (user) => {
      if (user !== null) {
        const {_user} = user;
        // console.log('onAuthStateChanged', _user.uid);

        const [refreshToken, userData] = convertUserData(_user);
        dispatch(setUserToken(refreshToken));
        dispatch(setUser(userData));
        saveItem('userToken', refreshToken);
        dispatch(changeIsLoading(false));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  useEffect(() => {
    async function getToken() {
      const userToken = await loadItem('userToken');

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
