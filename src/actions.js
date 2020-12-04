import {removeItem, saveItem} from './utils/asyncStorage';

export function changeLoginField(name, value) {
  return {
    type: 'changeLoginField',
    payload: {name, value},
  };
}

export function requestLogin(id, pw) {
  const userToken = id + pw;

  saveItem('userToken', userToken);
  // .then(() => console.log('토큰 저장 성공'));

  return {
    type: 'requestLogin',
    payload: {userToken},
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
