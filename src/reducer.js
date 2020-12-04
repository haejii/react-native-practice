const initialLoginFields = {
  username: '',
  password: '',
};

const initialState = {
  isLoading: true,
  userToken: null,
  loginFields: {
    ...initialLoginFields,
  },
};

const reducers = {
  changeLoginField: (state, {payload: {name, value}}) => {
    return {
      ...state,
      loginFields: {
        ...state.loginFields,
        [name]: value,
      },
    };
  },

  requestLogin: (state, {payload: {userToken}}) => {
    return {
      ...state,
      userToken,
    };
  },

  setUserToken: (state, {payload: {userToken}}) => {
    return {
      ...state,
      userToken,
    };
  },

  clearUserToken: (state) => {
    return {
      ...state,
      userToken: null,
    };
  },

  changeIsLoading: (state, {payload: {isLoading}}) => {
    return {
      ...state,
      isLoading,
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
