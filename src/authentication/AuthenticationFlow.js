import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import {changeIsLoading, requestUserInfo, setUserToken} from '../actions';
import {loadItem} from '../utils/asyncStorage';
import SplashScreen from '../screen/SplashScreen';
import SignInScreen from '../screen/SignInScreen';
import Main from '../screen/MainContainer';
import {Button} from 'react-native';
import JoinScreen from '../screen/JoinScreen';
import JoinCompleteScreen from '../screen/JoinCompleteScreen';
import errors from '../utils/errors';

const Stack = createStackNavigator();

export default function AuthenticationFlow() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);
  const accessToken = useSelector((state) => state.userToken);

  const user = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.userToken);

  const error = useSelector((state) => state.error);

  useEffect(() => {
    async function getToken() {
      const token = await loadItem('userToken');
      // const userInfo = await loadItem('userInfo');

      if (token) {
        dispatch(setUserToken(token));
        dispatch(requestUserInfo());
      }

      // if (userInfo) {
      //   dispatch(setUser(userInfo));
      // }

      dispatch(changeIsLoading(false));
    }

    getToken();

    console.log('auth');
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : accessToken === null ||
          (error.status && error.name === errors.LOGIN_ERROR) ? (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: '로그인',
                // animationTypeForReplace: !accessToken ? 'pop' : 'push',
              }}
            />
            <Stack.Screen
              name="회원가입"
              component={JoinScreen}
              initialParams={{}}
            />
            <Stack.Screen
              name="JoinCompleteScreen"
              component={JoinCompleteScreen}
            />
          </>
        ) : user &&
          (!user.age ||
            !user.gender ||
            !user.height ||
            !user.weight ||
            !user.kidneyType ||
            !user.activityId) ? (
          <Stack.Screen
            name="회원가입"
            component={JoinScreen}
            initialParams={{userInfo: user, accessToken: userToken}}
          />
        ) : (
          <Stack.Screen
            name=" "
            component={Main}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#127185',
              },
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
