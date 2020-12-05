const initialLoginFields = {
  username: '',
  password: '',
};

const initialUser = {
  uid: '',
  photoURL: '',
  displayName: '',
};

const initialState = {
  isLoading: true,
  userToken: null,
  loginFields: {
    ...initialLoginFields,
  },
  user: {
    ...initialUser,
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

  setUser: (state, {payload: {user}}) => {
    return {
      ...state,
      user,
    };
  },

  clearUser: (state) => {
    return {
      ...state,
      user: initialUser,
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
