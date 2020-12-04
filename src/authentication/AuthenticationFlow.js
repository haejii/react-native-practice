import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import {changeIsLoading, setUserToken} from '../actions';
import {loadItem} from '../utils/asyncStorage';
import SplashScreen from '../screen/SplashScreen';
import SignInScreen from '../screen/SignInScreen';
import HomeScreen from '../screen/HomeScreen';

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
