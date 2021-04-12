import {stackOrderNone} from 'd3-shape';
import {Platform, Pressable, StyleSheet, ViewComponent} from 'react-native';

const ScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SignInScreenStyles = StyleSheet.create({
  loginTitle: {
    fontSize: 44,
    fontWeight: '900',
  },
  loginField: {
    width: '80%',
    backgroundColor: 'white',
    // height: '5%',
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    marginBottom: '1%',
  },
  loginButtonContainer: {
    marginTop: '4%',
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-evenly',
  },
  loginButton: {
    borderWidth: 0,
    height: 48,
    width: 100,
    backgroundColor: 'teal',
    borderRadius: 6,
  },
  loginButtonText: {
    color: 'white',
  },
  btnKakaoLogin: {
    marginTop: 10,
    height: 48,
    width: 200,
    alignSelf: 'center',
    // backgroundColor: '#F8E71C',
    backgroundColor: '#FEE500',
    borderRadius: 12,
    borderWidth: 0,
  },
  txtKakaoLogin: {
    // fontSize: 16,
    // #3d3d3d
    color: '#000000',
    opacity: 0.8,
  },
});

// 회원가입 style
const JoinScreenStyles = StyleSheet.create({
  JoinField: {
    width: '90%',
    backgroundColor: 'white',
    marginTop: '2%',
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    marginBottom: '1%',
  },

  GenderButtonContainer: {
    marginTop: '4%',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
  },

  birthButtonContainer: {
    marginTop: '4%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  GenderButton: {
    borderWidth: 2,
    height: 48,
    width: 150,
    marginLeft: '14%',
    backgroundColor: 'white',
    borderColor: 'blue',
    borderRadius: 6,
  },
  buttonContent: (gender) => {
    return {
      borderWidth: 1,
      height: 48,
      width: 150,
      marginLeft: '14%',
      //borderRadius: 'green',
      backgroundColor: gender === 'M' ? 'skyblue' : 'white',
    };
  },

  buttonContent2: (gender) => {
    return {
      borderWidth: 1,
      height: 48,
      width: 150,
      marginLeft: '14%',
      backgroundColor: gender === 'F' ? 'skyblue' : 'white',
    };
  },

  GenderButtonText: {
    color: 'black',
  },

  ViewContainer: {
    width: '100%',
    marginRight: '-6%',
    marginTop: '3%',
  },
  checkIdBtn: {
    width: 150,
    height: 30,
    marginTop: '2%',
    marginLeft: '3%',
    backgroundColor: 'yellow',
    borderRadius: 4,
  },

  birthBtn: {
    width: 100,
    height: 30,
    alignItems: 'center',
    marginLeft: '3%',
    backgroundColor: 'skyblue',
    borderRadius: 4,
  },
});

const SplashScreenStyles = StyleSheet.create({
  loading: {
    fontSize: 24,
    fontWeight: '800',
  },

  indicator: {
    paddingTop: '10%',
  },
});

const HomeScreenStyles = StyleSheet.create({
  textViewContainer: {
    flexDirection: 'column',
    height: 300,
    paddingVertical: 30,
    flex: 2,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textDetail: {fontSize: 20},
  textInterval: {marginTop: 5},
  mealButtonView: {
    flex: 3,
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 40 : 70,
    height: '100%',
  },

  mealButtonContainer: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  mealButton: {
    width: '35%',
    height: '70%',
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealButtonText: {fontSize: 24},
  nuturitionInputContainer: {
    flex: 6,
    width: '80%',
    justifyContent: 'center',
  },
  nuturitionInputSubject: {fontSize: 27, bottom: 10},
  nuturitionInput: {
    width: '100%',
    backgroundColor: 'lightgrey',
    height: Platform.OS === 'ios' ? '8%' : '20%',
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: '4%',
    marginRight: '5%',
  },
  nuturitionTitle: {fontSize: 16, marginBottom: 10},
});

const KakaoLoginStyles = StyleSheet.create({
  btnKakaoLogin: {
    marginTop: 10,
    height: 48,
    width: 200,
    alignSelf: 'center',
    // backgroundColor: '#F8E71C',
    backgroundColor: '#FEE500',
    borderRadius: 12,
    borderWidth: 0,
  },
  txtKakaoLogin: {
    // fontSize: 16,
    // #3d3d3d
    color: '#000000',
    opacity: 0.8,
  },
});

const FoodInformationModalStyles = StyleSheet.create({
  itemContainer: ({isAlreadyEat, mealTime} = {}) => ({
    width: '90%',
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isAlreadyEat ? 'red' : 'skyblue',
    paddingHorizontal: 10,
    borderRadius: 8,
  }),
  itemView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 22,
    color: 'white',
  },
  modalViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    width: '90%',
    height: Platform.OS === 'ios' ? '60%' : '70%',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodTitle: {fontWeight: 'bold', fontSize: 24, marginBottom: 20},
  nuturitionText: {fontSize: Platform.OS === 'ios' ? 20 : 17},
  modalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    margin: Platform.OS === 'ios' ? 0 : 15,
  },

  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  openButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

const SearchResultStyles = StyleSheet.create({
  searchResultContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MyPageScreenStyles = StyleSheet.create({
  BasicInformationText: {
    backgroundColor: 'skyblue',
    width: '90%',
    padding: 5,
    fontSize: Platform.OS === 'ios' ? 24 : 20,
    fontWeight: '800',
    marginBottom: 10,
  },

  anotherInformationText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
  },

  ViewContainer: {
    flex: Platform.OS === 'ios' ? 3 : 4,
    left: '5%',
    marginTop: 30,
  },

  AndroidTouchBtnContainer: {
    alignItems: Platform.OS === 'ios' ? 'baseline' : 'center',
    left: Platform.OS === 'ios' ? 0 : '-5%',
    marginTop: Platform.OS === 'ios' ? 0 : '5%',
  },

  TouchBtn: {
    width: '50%',
    height: '50%',
    backgroundColor: 'skyblue',
  },
});

const ContentScreenStyle = StyleSheet.create({
  removeBtn: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    marginLeft: 10,
    marginTop: 4,
    borderColor: 'red',
    borderRadius: 35,
  },
});
export {
  ScreenStyles,
  SignInScreenStyles,
  SplashScreenStyles,
  HomeScreenStyles,
  KakaoLoginStyles,
  FoodInformationModalStyles,
  SearchResultStyles,
  JoinScreenStyles,
  MyPageScreenStyles,
  ContentScreenStyle,
};
