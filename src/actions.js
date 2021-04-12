import {removeItem, saveItem} from './utils/asyncStorage';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {SERVER_PATH} from './service/apis';
import Axios from 'axios';

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

      // console.log('kakao api login request success', result);

      const response = await fetch(SERVER_PATH + '/kakao', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({accessToken: result.accessToken}),
      });

      const loginResult = await response.json();
      console.log('requestLoginWithKakao result', loginResult);

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

export function requestUpdateNuturitionGoal({
  calorie,
  protein,
  phosphorus,
  potassium,
  sodium,
}) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch(SERVER_PATH + '/user/nutirition', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
        body: JSON.stringify({
          calorie,
          protein,
          phosphorus,
          potassium,
          sodium,
        }),
      });

      const result = await response.json();
      console.log('영양소 변경 성공', result);

      dispatch(requestUserInfo());
    } catch (e) {
      console.log('영양소 저장 실패');
      console.log(e);
    }
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
      const response = await fetch(SERVER_PATH + '/user/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
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
      const response = await fetch(SERVER_PATH + '/user', {
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
      const response = await fetch(SERVER_PATH + '/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      });

      const {userInfo} = await response.json();
      console.log('requestUserInfo result', userInfo);

      dispatch(setError({}));
      dispatch(setUser(userInfo));
      // await saveItem('userInfo', userInfo);
    } catch (e) {
      dispatch(
        setError({
          status: true,
          name: '로그인 실패',
          message: '네트워크 에러가 발생했습니다. 잠시 후 다시 시도해주세요!',
        }),
      );
      console.log('유저정보 가져오기 실패!', e);
    }
  };
}

export function setError({status, name, message} = {}) {
  return {
    type: 'setError',
    payload: {status, name, message},
  };
}

export function changeCount(foodCount) {
  return {
    type: 'changeCount',
    payload: {
      foodCount,
    },
  };
}

export function addBasket(newBasketFood) {
  return {
    type: 'addBasket',
    payload: {
      newBasketFood,
    },
  };
}

export function removeBasket(value) {
  return {
    type: 'removeBasket',
    payload: {
      value,
    },
  };
}

export function resetBasket(value) {
  return {
    type: 'resetBasket',
    payload: {
      value,
    },
  };
}

export function requestFoods(foodName) {
  return async (dispatch, getState) => {
    try {
      const {userToken} = getState();

      const response = await fetch(
        SERVER_PATH + '/foods?foodName=' + foodName,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
        },
      );
      const result = await response.json();

      console.log(result);

      const {isSuccess, foods, message} = result;

      if (isSuccess) {
        dispatch(setError());
        dispatch(setSearchedFoodResults(foods));
      } else {
        dispatch(setError({status: true, name: '검색 실패', message}));
        dispatch(setSearchedFoodResults([]));
      }
    } catch (e) {
      console.log(e);
      dispatch(setError({status: true, name: '검색 에러', message: e}));
    }
  };
}

export function setSearchedFoodResults(foods) {
  return {
    type: 'setSearchedFoodResults',
    payload: {foods},
  };
}

export function postAddMeal(foodIntakeRecordType, basketFoods) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch(SERVER_PATH + '/food-record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
        body: JSON.stringify({foodIntakeRecordType, basketFoods}),
      });
      const {isSuccess, message} = await response.json();

      console.log(message);

      if (isSuccess) {
        dispatch(requestFoodRecord());
        // dispatch(requestFoods());
      }
    } catch (e) {
      console.log(e);
      dispatch(setError({status: true, name: '식단 추가 에러', message: e}));
    }
  };
}

export function setMeal(meal) {
  return {
    type: 'setMeal',
    payload: {meal},
  };
}

export function requestFoodRecord() {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch(SERVER_PATH + '/food-record', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      });
      const result = await response.json();

      const {isSuccess, diet, message} = result;

      if (isSuccess) {
        dispatch(setError());
        dispatch(setMeal(diet));
        console.log('성공');
      } else {
        dispatch(setError({status: true, name: '식단 불러오기 실패', message}));
        dispatch(setMeal([]));
        console.log('실패');
        console.log(result);
        console.log(diet);
      }
    } catch (e) {
      console.log(e);
      dispatch(
        setError({status: true, name: '식단 불러오기 에러', message: e}),
      );
    }
  };
}

export function requestRemoveFood(foodIntakeRecordTypeId, foodId) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch(
        SERVER_PATH +
          '/food-record?foodIntakeRecordTypeId=' +
          foodIntakeRecordTypeId +
          '&foodId=' +
          foodId,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
        },
      );
      const result = await response.json();
      console.log(result);

      const {isSuccess, diet, message} = result;

      if (isSuccess) {
        dispatch(setError());
        dispatch(requestFoodRecord());
      } else {
        dispatch(setError({status: true, name: '음식 삭제 실패', message}));
      }
    } catch (e) {
      console.log(e);
      dispatch(setError({status: true, name: '음식 삭제 에러', message: e}));
    }
  };
}
