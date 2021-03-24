import {removeItem, saveItem} from './utils/asyncStorage';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {API_URL} from '@env';

export function changeLoginField(name, value) {
  return {
    type: 'changeLoginField',
    payload: {name, value},
  };
}

export function changeJoinField(name, value) {
  return {
    type: 'changeJoinField',
    payload: {name, value},
  };
}

export function requestLoginWithKakao() {
  return async (dispatch) => {
    try {
      const result = await KakaoLogins.login([
        KAKAO_AUTH_TYPES.Talk,
        KAKAO_AUTH_TYPES.Account,
      ]);

      console.log('kakao api login request success', result);
      console.log('API_URL', API_URL);

      const response = await fetch('http://localhost:3000' + '/kakao', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({accessToken: result.accessToken}),
      });

      const loginResult = await response.json();
      console.log(loginResult);

      const {jwt: accessToken, userInfo} = loginResult;

      dispatch(setUserToken(accessToken));
      // dispatch(setUser(userInfo));
      await saveItem('userToken', accessToken);
      // await saveItem('userInfo', userInfo);

      dispatch(requestUserInfo());

      dispatch(changeIsLoading(false));
    } catch (err) {
      if (err.code === 'E_CANCELLED_OPERATION') {
        console.log(`Login Cancelled:${err.message}`);
      } else {
        console.log(`Login Failed:${err.code} ${err.message}`);
      }
      dispatch(changeIsLoading(false));
    }
  };
}

export function logout() {
  return async (dispatch, getState) => {
    const {
      user: {loginType},
    } = getState();

    if (loginType === 'kakao') {
      // await KakaoLogins.logout();
    }
    // await auth().signOut();

    dispatch(clearUserToken());
    dispatch(clearUser());
    await removeItem('userToken');
    await removeItem('userInfo');
  };
}

export function setUserToken(userToken) {
  return {
    type: 'setUserToken',
    payload: {userToken},
  };
}

export function clearUserToken() {
  removeItem('userToken');
  removeItem('userInfo');
  //.then(() => console.log('토큰 삭제 성공'));

  return {
    type: 'clearUserToken',
  };
}

export function changeIsLoading(value) {
  return {
    type: 'changeIsLoading',
    payload: {isLoading: value},
  };
}

export function setUser(user) {
  console.log(user);
  return {
    type: 'setUser',
    payload: {user},
  };
}

export function clearUser() {
  return {
    type: 'clearUser',
  };
}

export function addMeal(time, id) {
  return {
    type: 'addMeal',
    payload: {time, id},
  };
}

export function addNuturition(food) {
  return {
    type: 'addNuturition',
    payload: {
      food,
    },
  };
}

export function saveFood(foodId) {
  return {
    type: 'saveFood',
    payload: {
      foodId,
    },
  };
}

export function deleteFood(foodId) {
  return {
    type: 'deleteFood',
    payload: {
      foodId,
    },
  };
}

export function changeNuturitionGoal(goal) {
  console.log(goal);
  return {
    type: 'changeNuturitionGoal',
    payload: {
      goal,
    },
  };
}

export function setKakaoUser(user) {
  return async (dispatch, getState) => {
    dispatch(setUser(user));
    await saveItem('userInfo', user);
  };
}

export function changeUserInfo(name, value) {
  return {
    type: 'changeUserInfo',
    payload: {name, value},
  };
}

export function changePasswordField(name, value) {
  return {
    type: 'changePasswordField',
    payload: {name, value},
  };
}

export function changePassword(current, willBeChanged) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch('http://localhost:3000' + '/user/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
        body: JSON.stringify({current, willBeChanged}),
      });

      const result = await response.json();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
}

export function requestUpdateBasicInfo({weight, kidneyType, activityId}) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch('http://localhost:3000' + '/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
        body: JSON.stringify({weight, kidneyType, activityId}),
      });

      const result = await response.json();
      console.log('기본정보 변경 성공', result);

      dispatch(requestUserInfo());
    } catch (e) {
      console.log(e);
    }
  };
}

export function requestUserInfo() {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    console.log('userToken', userToken);

    try {
      const response = await fetch('http://localhost:3000' + '/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      });

      const {userInfo} = await response.json();
      console.log(userInfo);

      dispatch(setUser(userInfo));
      // await saveItem('userInfo', userInfo);
    } catch (e) {
      console.log(e);
    }
  };
}
