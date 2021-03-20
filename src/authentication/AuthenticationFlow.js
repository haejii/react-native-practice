import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import {changeIsLoading, setUser, setUserToken} from '../actions';
import {loadItem, saveItem} from '../utils/asyncStorage';
import SplashScreen from '../screen/SplashScreen';
import SignInScreen from '../screen/SignInScreen';
import Main from '../screen/MainContainer';
import {Button} from 'react-native';
import JoinScreen from '../screen/JoinScreen';
import JoinCompleteScreen from '../screen/JoinCompleteScreen';

const Stack = createStackNavigator();

export default function AuthenticationFlow() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);
  const accessToken = useSelector((state) => state.userToken);

  const user = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.userToken);
  useEffect(() => {
    async function getToken() {
      const token = await loadItem('userToken');
      const userInfo = await loadItem('userInfo');

      if (token) {
        dispatch(setUserToken(token));
      }

      if (userInfo) {
        dispatch(setUser(userInfo));
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
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: '로그인',
                animationTypeForReplace: !accessToken ? 'pop' : 'push',
              }}
            />
            <Stack.Screen name="Join" component={JoinScreen} />
            <Stack.Screen
              name="JoinCompleteScreen"
              component={JoinCompleteScreen}
            />
          </>
        ) : user &&
          (!user.kidneyType ||
            !user.age ||
            !user.gender ||
            !user.height ||
            !user.weight ||
            !user.activityId) ? (
          <Stack.Screen
            name="Join"
            component={JoinScreen}
            initialParams={{userInfo: user, accessToken: userToken}}
          />
        ) : (
          <Stack.Screen
            name="Kidneys"
            component={Main}
            options={{
              headerLeft: (props) => {
                // console.log(props);
                return <Button title="달력" />;
              },
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
