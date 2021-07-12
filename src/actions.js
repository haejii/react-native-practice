import {removeItem, saveItem} from './utils/asyncStorage';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {SERVER_PATH} from './service/apis';
import moment from 'moment';
import errors from './utils/errors';
import {createImageFormData, getFormattedDate} from './utils/functions';
//import {resolvePlugin} from '@babel/core';

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

export function changeDialysis(name, value) {
  return {
    type: 'changeDialysis',
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

      console.log('body', response);
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

      const {isSuccess, userInfo, message} = await response.json();
      console.log('requestUserInfo result', userInfo);

      if (isSuccess) {
        dispatch(setError({}));
        dispatch(setUser(userInfo));
        dispatch(setError());
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.USER_INFO_NOT_FOUND,
            message,
          }),
        );
      }
    } catch (e) {
      dispatch(
        setError({
          status: true,
          name: errors.GET_USER_INFO_ERROR,
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
  console.log('2');
  return {
    type: 'changeCount',
    payload: {
      foodCount,
    },
  };
}

export function addBasket(newBasketFood) {
  console.log('3');
  return {
    type: 'addBasket',
    payload: {
      newBasketFood,
    },
  };
}

// StoreFood
export function storeFood(newBasketFood) {
  return {
    type: 'storeFood',
    payload: {
      newBasketFood,
    },
  };
}

export function resetStore(value) {
  return {
    type: 'resetStore',
    payload: {
      value,
    },
  };
}

export function postStoreFood(basketName, storedFood) {
  console.log(storeFood);
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch(SERVER_PATH + '/food-store', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
        method: 'POST',
        body: JSON.stringify({basketName, storedFood}),
      });

      const result = await response.json();

      const {isSuccess, message} = result;

      if (isSuccess) {
        dispatch(setError({name: errors.ADD_STOREFOOD_SUCESS}));
        dispatch(requestFoodStored());
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.ADD_DIALYSIS_MEMOS_FAILED,
            message,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.ADD_DIALYSIS_MEMOS_ERROR,
          message: err,
        }),
      );
      console.log(err);
    }
  };
}

export function requestFoodStored() {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch(SERVER_PATH + '/food-store', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      });

      const {isSuccess, Mystored, message} = await response.json();

      if (isSuccess) {
        console.log('성공');
        console.log(Mystored);
        dispatch(resetStore([]));
        dispatch(setMyStore(Mystored));
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.USER_INFO_NOT_FOUND,
            message,
          }),
        );
      }
    } catch (e) {
      dispatch(
        setError({
          status: true,
          name: errors.GET_USER_INFO_ERROR,
          message: '네트워크 에러가 발생했습니다. 잠시 후 다시 시도해주세요!',
        }),
      );
      console.log('유저정보 가져오기 실패!', e);
    }
  };
}

export function setMyStore(Mystore) {
  return {
    type: 'setMyStore',
    payload: {
      Mystore,
    },
  };
}

export function deleteStoreFoods(storedFoodId) {
  console.log('2.', storedFoodId);
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      console.log('delte StoreFoods');
      const response = await fetch(
        SERVER_PATH + '/food-store?storedFoodId=' + storedFoodId,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
          method: 'DELETE',
        },
      );

      const result = await response.json();

      const {isSuccess, message} = result;

      if (isSuccess) {
        dispatch(setError({name: errors.DELETE_DIALYSIS_MEMOS_SUCCESS}));
        dispatch(requestFoodStored());
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.DELETE_DIALYSIS_MEMOS_FAILED,
            message,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.DELETE_DIALYSIS_MEMOS_ERROR,
          message: err,
        }),
      );
      console.log(err);
    }
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

      const {isSuccess, foods, message, searchQuery} = result;

      if (isSuccess) {
        dispatch(setError());
        dispatch(setLastSearchQuery(searchQuery));
        dispatch(setSearchedFoodResults(foods));
      } else {
        dispatch(
          setError({status: true, name: errors.FOOD_NOT_FOUND, message}),
        );
        dispatch(setSearchedFoodResults([]));
      }
    } catch (e) {
      console.log(e);
      dispatch(
        setError({
          status: true,
          name: errors.REQUEST_FOOD_ERROR,
          message: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        }),
      );
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
    const {userToken, lastSearchQuery, lastSearchCategory} = getState();

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

      console.log('isSuccess : ' + isSuccess);
      console.log('message : ' + message);

      if (isSuccess) {
        const date = new Date();
        dispatch(
          requestFoodRecordWithDate(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          ),
        );
        dispatch(
          lastSearchQuery
            ? requestFoods(lastSearchQuery)
            : requestFoodsByCategory(lastSearchCategory),
        );
        dispatch(requestFoodNutrition());
        dispatch(setError());
        dispatch(resetBasket([]));
        dispatch(changeCount(0));
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.ADD_MEAL_FAILED,
            message,
          }),
        );
      }
    } catch (e) {
      console.log(e);
      dispatch(
        setError({status: true, name: errors.ADD_MEAL_ERROR, message: e}),
      );
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
        console.log(diet);
        dispatch(setError());
        dispatch(setMeal(diet));
        console.log('성공');
      } else {
        dispatch(setError({status: true, name: '식단 불러오기 실패', message}));
        dispatch(setMeal([]));
        console.log('requestFoodRecord 실패');
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
// date로 foodRecord 가져오기

export function setDateMeal(dateMeal) {
  return {
    type: 'setDateMeal',
    payload: {dateMeal},
  };
}

export function requestFoodRecordWithDate(date) {
  return async (dispatch, getState) => {
    const {userToken} = getState();
    console.log('requestFoodRecordWithDate들어감');

    try {
      const response = await fetch(SERVER_PATH + '/food-record/date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
        body: JSON.stringify({date}),
      });
      const result = await response.json();

      const {isSuccess, diet, message} = result;

      if (isSuccess) {
        console.log(date);
        console.log(diet);
        dispatch(setError());
        dispatch(setDateMeal(diet));
        console.log('성공');
      } else {
        dispatch(setError({status: true, name: '식단 불러오기 실패', message}));
        dispatch(setDateMeal([]));
        console.log('requestFoodRecordWithDate 실패');
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

// nutrition 가져오기

export function setNutrition(dateNutrition) {
  return {
    type: 'setNutrition',
    payload: {dateNutrition},
  };
}

export function requestFoodNutrition() {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch(SERVER_PATH + '/food-record/date', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      });
      const result = await response.json();

      const {isSuccess, nutrition, message} = result;

      if (isSuccess) {
        console.log(nutrition);
        dispatch(setError());
        dispatch(setNutrition(nutrition));
        console.log('set nutrition 성공');
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.NUTRITION_NOT_FOUND,
            message,
          }),
        );
        dispatch(setNutrition(nutrition));
        console.log('requestFoodNutrition 실패');
        console.log(result);
        console.log(nutrition);
      }
    } catch (e) {
      console.log(e);
      dispatch(
        setError({status: true, name: '영양소 정보 불러오기 에러', message: e}),
      );
    }
  };
}

export function requestRemoveFood(foodIntakeRecordTypeId, foodId, date) {
  return async (dispatch, getState) => {
    const {userToken, lastSearchQuery, lastSearchCategory} = getState();

    try {
      const response = await fetch(
        SERVER_PATH +
          '/food-record?foodIntakeRecordTypeId=' +
          foodIntakeRecordTypeId +
          '&foodId=' +
          foodId +
          '&date=' +
          date,
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
        dispatch(requestFoodRecordWithDate(date));
        dispatch(
          lastSearchQuery
            ? requestFoods(lastSearchQuery)
            : requestFoodsByCategory(lastSearchCategory),
        );
        dispatch(requestFoodNutrition());
      } else {
        dispatch(setError({status: true, name: '음식 삭제 실패', message}));
      }
    } catch (e) {
      console.log(e);
      dispatch(setError({status: true, name: '음식 삭제 에러', message: e}));
    }
  };
}

export function requestRemoveFoodsByMealTime(foodIntakeRecordId, date) {
  return async (dispatch, getState) => {
    const {userToken, lastSearchQuery, lastSearchCategory} = getState();

    try {
      const response = await fetch(
        SERVER_PATH + '/food-record/' + foodIntakeRecordId,
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
        dispatch(requestFoodRecordWithDate(date));
        dispatch(
          lastSearchQuery
            ? requestFoods(lastSearchQuery)
            : requestFoodsByCategory(lastSearchCategory),
        );
        dispatch(requestFoodNutrition());
      } else {
        dispatch(setError({status: true, name: '식단 삭제 실패', message}));
      }
    } catch (e) {
      console.log(e);
      dispatch(setError({status: true, name: '식단 삭제 에러', message: e}));
    }
  };
}

export function setLastSearchQuery(lastSearchQuery) {
  return {
    type: 'setLastSearchQuery',
    payload: {lastSearchQuery},
  };
}

// 복막 투석
export function addGeneralDialysis(dialysis, date, dialysisType, photo) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    dispatch(
      setError({
        name: errors.LOADING,
        message: '메모 업로드 중입니다. 잠시만 기다려주세요.',
      }),
    );

    try {
      const response = await fetch(SERVER_PATH + '/peritoneum-memo', {
        method: 'POST',
        headers: {
          'Content-Type': photo ? 'multipart/form-data' : 'application/json',
          'x-access-token': userToken,
        },
        body: photo
          ? createImageFormData(photo, {
              dialysis,
              date,
              dialysisType,
            })
          : JSON.stringify({
              dialysis,
              date,
              dialysisType,
            }),
      });

      const result = await response.json();
      const {isSuccess, message} = result;

      if (isSuccess) {
        dispatch(setError({name: errors.ADD_DIALYSIS_MEMOS_SUCCESS}));
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.ADD_DIALYSIS_MEMOS_FAILED,
            message,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.ADD_DIALYSIS_MEMOS_ERROR,
          message: err,
        }),
      );
      console.log(err);
    }
  };
}

export function addHemodialysisMemo(photo, memo, date) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    dispatch(
      setError({
        name: errors.LOADING,
        message: '메모 업로드 중입니다. 잠시만 기다려주세요.',
      }),
    );

    try {
      const response = await fetch(SERVER_PATH + '/hemodialysis-memo', {
        headers: {
          'Content-Type': photo ? 'multipart/form-data' : 'application/json',
          'x-access-token': userToken,
        },
        method: 'POST',
        body: photo
          ? createImageFormData(photo, {memo, date})
          : JSON.stringify({memo, date}),
      });

      const result = await response.json();

      const {isSuccess, message} = result;

      if (isSuccess) {
        dispatch(setError({name: errors.ADD_DIALYSIS_MEMOS_SUCCESS}));
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.ADD_DIALYSIS_MEMOS_FAILED,
            message,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.ADD_DIALYSIS_MEMOS_ERROR,
          message: err,
        }),
      );
      console.log(err);
    }
  };
}

export function fetchMemos(date, kidneyType) {
  console.log('fetchMemos', kidneyType);
  const url =
    kidneyType === 6 ? '/peritoneum-memo?date=' : '/hemodialysis-memo?date=';
  console.log('url' + url);
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch(SERVER_PATH + url + date, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      });
      const result = await response.json();
      const {isSuccess, hemodialysisMemos, message} = result;

      let tempItems = {};

      const selectedDate = new Date(date);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const yearMonth = month < 10 ? `${year}-0${month}` : `${year}-${month}`;

      Array(moment(yearMonth).daysInMonth())
        .fill()
        .forEach((_, i) => {
          if (i + 1 < 10) {
            tempItems[`${yearMonth}-0${i + 1}`] = [];
          } else {
            tempItems[`${yearMonth}-${i + 1}`] = [];
          }
        });

      if (isSuccess) {
        hemodialysisMemos.forEach((hemodialysisMemo) => {
          const {
            dialysisId,
            recordDate,
            dialysisTypeId,
            degree,
            exchangeTime,
            injectionConcentration,
            injectionAmount,
            drainage,
            dehydration,
            weight,
            bloodPressure,
            bloodSugar,
            edema,
            memo,
            photo,
          } = hemodialysisMemo;
          const formattedDate = getFormattedDate(recordDate);

          tempItems[formattedDate] = [
            {
              dialysisId,
              dialysisTypeId,
              name: memo,
              image: photo,
              degree,
              exchangeTime,
              injectionConcentration,
              injectionAmount,
              drainage,
              dehydration,
              weight,
              bloodPressure,
              bloodSugar,
              edema,
              date: formattedDate,
            },
          ];
        });

        dispatch(setError());
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.FETCH_DIALYSIS_MEMOS_FAILED,
            message,
          }),
        );
      }

      dispatch(setDialysisMemos({}));
      dispatch(setDialysisMemos(tempItems));
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.FETCH_DIALYSIS_MEMOS_ERROR,
          message: '네트워크 에러가 발생했습니다. 잠시 후 다시 시도해주세요!',
        }),
      );
      console.log(errors.FETCH_DIALYSIS_MEMOS_ERROR, err);
    }
  };
}

export function setDialysisMemos(dialysisMemos) {
  return {
    type: 'setDialysisMemos',
    payload: {dialysisMemos},
  };
}

export function updateHemodialysisMemo({dialysisId, image, name}) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    dispatch(
      setError({
        name: errors.LOADING,
        message: '메모 수정 중입니다. 잠시만 기다려주세요.',
      }),
    );

    try {
      const response = await fetch(SERVER_PATH + '/hemodialysis-memo', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
        method: 'PUT',
        body:
          image && image.uri
            ? createImageFormData(image, {name, dialysisId})
            : JSON.stringify({name, dialysisId}),
      });

      const result = await response.json();

      const {isSuccess, message} = result;

      if (isSuccess) {
        dispatch(setError({name: errors.UPDATE_DIALYSIS_MEMOS_SUCCESS}));
        dispatch(clearDialysis());
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.UPDATE_DIALYSIS_MEMOS_FAILED,
            message,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.UPDATE_DIALYSIS_MEMOS_ERROR,
          message: err,
        }),
      );
      console.log(err);
    }
  };
}

export function removeDialysisMemo(dialysisId) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      console.log('delete 02');
      const response = await fetch(
        SERVER_PATH + '/dialysis-memo?dialysisId=' + dialysisId,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
          method: 'DELETE',
        },
      );

      const result = await response.json();

      const {isSuccess, message} = result;

      if (isSuccess) {
        dispatch(setError({name: errors.DELETE_DIALYSIS_MEMOS_SUCCESS}));
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.DELETE_DIALYSIS_MEMOS_FAILED,
            message,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.DELETE_DIALYSIS_MEMOS_ERROR,
          message: err,
        }),
      );
      console.log(err);
    }
  };
}

export function updateGeneralDialysisMemo({dialysisId, image, dialysis}) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    dispatch(
      setError({
        name: errors.LOADING,
        message: '메모 수정 중입니다. 잠시만 기다려주세요.',
      }),
    );

    try {
      const response = await fetch(SERVER_PATH + '/peritoneum-memo', {
        headers: {
          'Content-Type':
            image && image.uri ? 'multipart/form-data' : 'application/json',
          'x-access-token': userToken,
        },
        method: 'PUT',
        body:
          image && image.uri
            ? createImageFormData(image, {dialysis, dialysisId})
            : JSON.stringify({dialysis, dialysisId}),
      });

      const result = await response.json();

      const {isSuccess, message} = result;

      if (isSuccess) {
        dispatch(setError({name: errors.UPDATE_DIALYSIS_MEMOS_SUCCESS}));
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.UPDATE_DIALYSIS_MEMOS_FAILED,
            message,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.UPDATE_DIALYSIS_MEMOS_ERROR,
          message: err,
        }),
      );
      console.log(err);
    }
  };
}

export function clearDialysis() {
  return {
    type: 'clearDialysis',
  };
}

export function requestFoodCategory() {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    try {
      const response = await fetch(SERVER_PATH + '/food-category', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      });

      const result = await response.json();

      const {isSuccess, message, foodCategories} = result;

      if (isSuccess) {
        console.log(foodCategories);
        dispatch(setFoodCategories(foodCategories));
      } else {
        dispatch(
          setError({
            status: true,
            name: errors.DELETE_DIALYSIS_MEMOS_FAILED,
            message,
          }),
        );
      }
    } catch (err) {
      dispatch(
        setError({
          status: true,
          name: errors.DELETE_DIALYSIS_MEMOS_ERROR,
          message: err,
        }),
      );
      console.log(err);
    }
  };
}

export function setFoodCategories(foodCategories) {
  return {
    type: 'setFoodCategories',
    payload: {foodCategories},
  };
}

export function requestFoodsByCategory(category) {
  return async (dispatch, getState) => {
    try {
      const {userToken} = getState();

      const response = await fetch(
        SERVER_PATH + '/foods/category?category=' + category,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
        },
      );
      const result = await response.json();

      console.log(result);

      const {isSuccess, foods, message, searchCategory} = result;

      if (isSuccess) {
        dispatch(setError());
        dispatch(setLastSearchCategory(searchCategory));
        dispatch(setSearchedFoodResults(foods));
      } else {
        dispatch(
          setError({status: true, name: errors.FOOD_NOT_FOUND, message}),
        );
        dispatch(setSearchedFoodResults([]));
      }
    } catch (e) {
      console.log(e);
      dispatch(
        setError({
          status: true,
          name: errors.REQUEST_FOOD_ERROR,
          message: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        }),
      );
    }
  };
}

export function setLastSearchCategory(lastSearchCategory) {
  return {
    type: 'setLastSearchCategory',
    payload: {lastSearchCategory},
  };
}

export function changeFoodsByCategory(selectedIndex) {
  return {
    type: 'changeFoodsByCategory',
    payload: {selectedIndex},
  };
}

export function setDiet(diets) {
  return {
    type: 'setDiet',
    payload: {diets},
  };
}

export function removeRecommend(btn, value2) {
  return {
    type: 'removeRecommend',
    payload: {
      btn,
      value2,
    },
  };
}

export function requestDiets(kidneyType, gender) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    console.log('requestDiets(recommend) 들어옴');
    try {
      const response = await fetch(
        SERVER_PATH + '/diet?kidneyType=' + kidneyType + '&gender=' + gender,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
        },
      );
      const result = await response.json();

      console.log(result);

      const {isSuccess, diet, recipes, message} = result;

      //console.log(typeof recipes);

      if (isSuccess) {
        dispatch(setError());
        dispatch(setDiet(diet));
      } else {
        dispatch(setError({status: true, name: '식단 삭제 실패', message}));
      }
    } catch (e) {
      console.log(e);
      dispatch(setError({status: true, name: '식단 호출 에러', message: e}));
    }
  };
}

export function setRecipe(recipe) {
  return {
    type: 'setRecipe',
    payload: {recipe},
  };
}

export function requestFoodRecipe(parentFoodId) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    console.log('requestRecipe 들어왔당', parentFoodId);
    try {
      const response = await fetch(
        SERVER_PATH + '/diet-recipe?parentFoodId=' + parentFoodId,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
        },
      );
      const result = await response.json();

      const {isSuccess, recipe, message} = result;

      console.log(recipe);

      if (isSuccess) {
        dispatch(setError());
        dispatch(setRecipe(recipe));
      } else {
        dispatch(setError({status: true, name: '식단 삭제 실패', message}));
      }
    } catch (e) {
      console.log(e);
      dispatch(setError({status: true, name: '식단 호출 에러', message: e}));
    }
  };
}

export function setAllDiet(diet) {
  return {
    type: 'setAllDiet',
    payload: {diet},
  };
}

export function requestAllDiets(kidneyType, gender) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    console.log('requestAllDiets 들어옴');
    try {
      const response = await fetch(
        SERVER_PATH +
          '/diet-all?kidneyType=' +
          kidneyType +
          '&gender=' +
          gender,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
        },
      );
      const result = await response.json();

      const {isSuccess, diet, message} = result;

      //console.log(diet);

      if (isSuccess) {
        dispatch(setError());
        dispatch(setAllDiet(diet));
      } else {
        dispatch(setError({status: true, name: '식단 삭제 실패', message}));
      }
    } catch (e) {
      console.log(e);
      dispatch(setError({status: true, name: '식단 호출 에러', message: e}));
    }
  };
}

export function requestCertainDiet(key) {
  return async (dispatch, getState) => {
    const {userToken} = getState();

    console.log('requestCertainDiet 들어옴');
    try {
      const response = await fetch(SERVER_PATH + '/diet-certain?key=' + key, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      });
      const result = await response.json();

      const {isSuccess, diet, message} = result;

      if (isSuccess) {
        dispatch(setError());
        dispatch(setDiet(diet));
      } else {
        dispatch(setError({status: true, name: '식단 삭제 실패', message}));
      }
    } catch (e) {
      console.log(e);
      dispatch(setError({status: true, name: '식단 호출 에러', message: e}));
    }
  };
}

export function removeRecommendBasket(value1, value2) {
  console.log('2' + value1 + value2);
  return {
    type: 'removeRecommendBasket',
    payload: {
      value1,
      value2,
    },
  };
}
