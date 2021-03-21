import {removeItem, saveItem} from './utils/asyncStorage';
import auth from '@react-native-firebase/auth';
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

export function requestLoginWithFirebase(id, pw) {
  return async (dispatch) => {
    try {
      const response = await auth().signInWithEmailAndPassword(id, pw);
      console.log('requestLoginWithFirebase', response);
    } catch (err) {
      console.log(err);
      dispatch(changeIsLoading(false));
    }
  };
}

export function requestLoginWithKakao() {
  return async (dispatch) => {
    try {
      const result = await KakaoLogins.login([
        KAKAO_AUTH_TYPES.Talk,
        KAKAO_AUTH_TYPES.Account,
      ]);

      // console.log('kakao api login request success', result);

      const response = await fetch('http://localhost:3000/kakao', {
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
      dispatch(setUser(userInfo));
      await saveItem('userToken', accessToken);
      await saveItem('userInfo', userInfo);
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
      user: {type},
    } = getState();

    console.log('before logout currentUser', auth().currentUser);

    if (type === 'kakao') {
      await KakaoLogins.logout();
    }
    // await auth().signOut();

    console.log('after logout currentUser', auth().currentUser);
    dispatch(clearUserToken());
    dispatch(clearUser());
    await removeItem('userToken');
    await removeItem('userInfo');
  };
}

export function requestJoinWithFirebase(id, pw) {
  return async () => {
    await auth()
      .createUserWithEmailAndPassword(id, pw)
      .then(() => console.log('SignUp Success!'))
      .catch((err) => console.log(err));
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

    const response = await fetch(API_URL + '/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      },
      body: JSON.stringify({current, willBeChanged}),
    });

    const result = await response.json();
    console.log(result);
  };
}
