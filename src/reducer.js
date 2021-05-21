const initialLoginFields = {
  username: '',
  password: '',
};

const initialUser = {
  id: null,
  goal: {
    calorie: 2000,
    protein: 85,
    phosphorus: 800,
    potassium: 2000,
    sodium: 2000,
  },
  email: '',
  nickname: '',
  height: 0,
  weight: 0,
  gender: '',
  birth: '',
  kidneyType: null,
  activityId: null,
  loginType: '',
};

const initialJoinFields = {
  email: '',
  password: '',
  nickname: '',
  height: '',
  weight: '',
  gender: '',
  birth: '',
  kidneyType: '',
  activityId: '',
};

const initialChangePasswordFields = {
  current: '',
  willBeChanged: '',
};

const initialMeal = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
};

const initialDateMeal = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
};

const initialNutrition = {
  calorie: 0,
  protein: 0,
  phosphorus: 0,
  potassium: 0,
  sodium: 0,
};

const initialDialysis = {
  degrees: '',
  exchangeTime: '',
  injectionConcentration: '',
  injectionAmount: '',
  drainage: '',
  dehydration: '',
  weight: '',
  bloodPressure: '',
  bloodSugar: '',
  edema: '',
  memo: '',
};

const initialState = {
  isLoading: true,
  userToken: null,
  loginFields: {
    ...initialLoginFields,
  },

  JoinFields: {
    ...initialJoinFields,
  },

  user: {
    ...initialUser,
  },
  nuturition: {
    calorie: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    sodium: 0,
    calcium: 0,
    potassium: 0,
    iron: 0,
    phosphorus: 0,
  },
  meal: {
    ...initialMeal,
  },
  dateMeal: {
    ...initialDateMeal,
  },
  dateNutrition: {
    ...initialNutrition,
  },
  storedFood: [],
  changePasswordFields: {
    ...initialChangePasswordFields,
  },
  error: {
    status: false,
    name: '',
    message: '',
  },
  foodCount: 0,
  basketFoods: [],
  searchedFoodResults: [],
  lastSearchQuery: '',
  lastSearchCategory: '',
  dialysis: {
    ...initialDialysis,
  },
  dialysisMemos: {},
  foodCategories: [],
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

  changeJoinField: (state, {payload: {name, value}}) => {
    return {
      ...state,
      JoinFields: {
        ...state.JoinFields,
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
    const {user: previousUser} = state;
    console.log(user);
    return {
      ...state,
      user: {...previousUser, ...user},
    };
  },

  clearUser: (state) => {
    return {
      ...state,
      user: initialUser,
    };
  },

  addMeal: (state, {payload: {time, id}}) => {
    const {meal} = state;

    console.log({
      meal: {
        ...meal,
        [time]: [...meal[time], id],
      },
    });

    return {
      ...state,
      meal: {
        ...meal,
        [time]: [...meal[time], id],
      },
    };
  },

  addNuturition: (state, {payload: {food}}) => {
    const {
      calorie,
      carbohydrate,
      protein,
      fat,
      sodium,
      calcium,
      potassium,
      iron,
      phosphorus,
    } = state.nuturition;

    return {
      ...state,
      nuturition: {
        calorie: calorie + food.calorie,
        carbohydrate: carbohydrate + food.carbohydrate,
        protein: protein + food.protein,
        fat: fat + food.fat,
        sodium: sodium + food.sodium,
        calcium: calcium + food.calcium,
        potassium: potassium + food.potassium,
        iron: iron + food.iron,
        phosphorus: phosphorus + food.phosphorus,
      },
    };
  },

  saveFood: (state, {payload: {foodId}}) => {
    const {storedFood} = state;

    return {
      ...state,
      storedFood: [...storedFood, foodId],
    };
  },

  deleteFood: (state, {payload: {foodId}}) => {
    const {storedFood} = state;

    return {
      ...state,
      storedFood: storedFood.filter((id) => id !== foodId),
    };
  },

  changeNuturitionGoal: (state, {payload: {goal}}) => {
    return {
      ...state,
      user: {
        ...state.user,
        goal,
      },
    };
  },

  changeUserInfo: (state, {payload: {name, value}}) => {
    return {
      ...state,
      user: {
        ...state.user,
        [name]: value,
      },
    };
  },

  changePasswordField: (state, {payload: {name, value}}) => {
    return {
      ...state,
      changePasswordFields: {
        ...state.changePasswordFields,
        [name]: value,
      },
    };
  },

  setError: (state, {payload: {status = false, name = '', message = ''}}) => {
    console.log('reducer setError', {status, name, message});
    return {
      ...state,
      error: {
        status,
        name,
        message,
      },
    };
  },

  changeCount: (state, {payload: {foodCount}}) => {
    return {
      ...state,
      foodCount,
    };
  },

  addBasket: (state, {payload: {newBasketFood}}) => {
    const {basketFoods} = state;

    console.log({basketFoods: [...basketFoods, newBasketFood]});
    return {
      ...state,
      basketFoods: [...basketFoods, newBasketFood],
    };
  },

  storeFood: (state, {payload: {newBasketFood}}) => {
    const {storedFood} = state;

    console.log({storedFood: [...storedFood, newBasketFood]});
    return {
      ...state,
      storedFood: [...storedFood, newBasketFood],
    };
  },

  removeBasket: (state, {payload: {value}}) => {
    const {basketFoods} = state;
    console.log('basketFoods : ' + basketFoods);
    console.log('value : ' + value);

    return {
      ...state,
      basketFoods: basketFoods.filter(
        (basketFood) => basketFood.foodId !== value,
      ),
    };
  },

  resetBasket: (state, {payload: {value}}) => {
    return {
      ...state,
      basketFoods: value,
    };
  },

  resetStore: (state, {payload: {value}}) => {
    return {
      ...state,
      storedFood: value,
    };
  },

  setSearchedFoodResults: (state, {payload: {foods}}) => {
    return {
      ...state,
      searchedFoodResults: foods,
    };
  },

  setMeal: (state, {payload: {meal}}) => {
    console.log('setMeal', meal);

    return {
      ...state,
      meal: {
        ...initialMeal,
        ...meal,
      },
    };
  },
  setDateMeal: (state, {payload: {dateMeal}}) => {
    console.log('dateMeal', dateMeal);

    return {
      ...state,
      dateMeal: {
        ...initialDateMeal,
        ...dateMeal,
      },
    };
  },

  setMyStore: (state, {payload: {Mystore}}) => {
    console.log('Mystore', Mystore);

    return {
      ...state,
      storeFood: {
        ...Mystore,
      },
    };
  },

  setNutrition: (state, {payload: {dateNutrition}}) => {
    console.log('setNutrition', {
      ...state,
      nuturition: {
        ...initialNutrition,
        ...dateNutrition,
      },
    });

    return {
      ...state,
      nuturition: {
        ...initialNutrition,
        ...dateNutrition,
      },
    };
  },

  setLastSearchQuery: (state, {payload: {lastSearchQuery}}) => {
    return {
      ...state,
      lastSearchQuery,
      lastSearchCategory: '',
    };
  },

  setDialysisMemos: (state, {payload: {dialysisMemos}}) => {
    return {
      ...state,
      dialysisMemos,
    };
  },

  setFoodCategories: (state, {payload: {foodCategories}}) => {
    return {
      ...state,
      foodCategories,
    };
  },

  setLastSearchCategory: (state, {payload: {lastSearchCategory}}) => {
    return {
      ...state,
      lastSearchQuery: '',
      lastSearchCategory,
    };
  },

  changeDialysis: (state, {payload: {name, value}}) => {
    return {
      ...state,
      dialysis: {
        ...state.dialysis,
        [name]: value,
      },
    };
  },

  clearDialysis: (state) => {
    console.log('clearDialysis');
    return {
      ...state,
      dialysis: {...initialDialysis},
    };
  },

  changeFoodsByCategory: (state, {payload: {selectedIndex}}) => {
    let changedFoodCategories = state.foodCategories;
    changedFoodCategories.forEach((category) => {
      category.selected = false;
    });

    console.log('selectedIndex', selectedIndex);

    if (selectedIndex !== null) {
      changedFoodCategories[selectedIndex].selected = true;
    }

    return {
      ...state,
      foodCategories: changedFoodCategories,
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
