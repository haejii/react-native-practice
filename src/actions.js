import {removeItem, saveItem} from './utils/asyncStorage';
import auth from '@react-native-firebase/auth';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {getPixelSizeForLayoutSize} from 'react-native/Libraries/Utilities/PixelRatio';

export function changeLoginField(name, value) {
  return {
    type: 'changeLoginField',
    payload: {name, value},
  };
}

export function requestLoginWithFirebase(id, pw) {
  return async (dispatch) => {
    try {
      const response = await auth().signInWithEmailAndPassword(id, pw);
      console.log(response);
      dispatch(changeIsLoading(false));
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

      const tokenResponse = await fetch('http://localhost:3000/kakao', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(result),
      });

      const {customToken} = await tokenResponse.json();

      console.log('server_resp', customToken);

      const signInResult = await auth().signInWithCustomToken(customToken);
      console.log('custom fb signIn Success!!!', signInResult);

      dispatch(setUserToken(customToken));
      await saveItem('userToken', customToken);

      console.log(`Login Finished:${JSON.stringify(auth().currentUser)}`);

      const profileResult = await KakaoLogins.getProfile();

      const {nickname, profile_image_url, email, id} = profileResult;

      dispatch(
        setUser({
          uid: id,
          photoURL: profile_image_url,
          displayName: nickname,
          type: 'kakao',
        }),
      );
      console.log(`Get Profile Finished:${JSON.stringify(profileResult)}`);

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
    await auth().signOut();

    console.log('after logout currentUser', auth().currentUser);
    dispatch(clearUserToken());
    dispatch(clearUser());
    await removeItem('userToken');
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
