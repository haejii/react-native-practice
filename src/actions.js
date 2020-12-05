import {removeItem, saveItem} from './utils/asyncStorage';
import auth from '@react-native-firebase/auth';

export function changeLoginField(name, value) {
  return {
    type: 'changeLoginField',
    payload: {name, value},
  };
}

export function requestLoginWithFirebase(id, pw) {
  return async () => {
    await auth()
      .signInWithEmailAndPassword(id, pw)
      .then(() => console.log('SignIn Success!'))
      .catch((err) => console.log(err));
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
