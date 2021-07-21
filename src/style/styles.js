import {stackOrderNone} from 'd3-shape';
import {Platform, Pressable, StyleSheet, ViewComponent} from 'react-native';

const ScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const BarStyle = StyleSheet.create({
  ViewContainer: {
    //flex: 1,
    height: 20,
    width: '100%',
  },
});
const SignInScreenStyles = StyleSheet.create({
  loginTitle: {
    fontSize: 44,
    //fontWeight: '900',
    fontFamily: 'NotoSansKR-Medium',
  },
  loginField: {
    width: '90%',
    backgroundColor: 'white',
    // height: '5%',
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    marginBottom: '5%',
    //borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#cdcdcd',
  },
  loginButtonContainer: {
    flex: 1,
    marginTop: 1,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
  },
  loginButton: {
    borderWidth: 0,
    height: 40,
    width: 380,
    backgroundColor: '#cdcdcd',
    borderRadius: 6,
  },
  JoinButton: {
    borderWidth: 0,
    marginRight: 20,
    height: 20,
    width: 120,
    borderRightWidth: 1,
    borderRadius: 0,
    borderColor: '#757575',
  },
  loginButtonText: {
    color: 'white',
  },
  JoinButtonText: {
    color: '#757575',
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
    borderBottomWidth: 1,
    borderColor: '#cdcdcd',
  },

  JoinFieldWithBtn: {
    width: '70%',
    backgroundColor: 'white',
    marginTop: '2%',
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16,
    marginBottom: '1%',
    borderBottomWidth: 1,
    borderColor: '#cdcdcd',
  },

  JoinFieldMainText: {
    fontSize: 15,
    fontFamily: 'NotoSansKR-Medium',
    color: '#2c2c2c',
  },
  GenderButtonContainer: {
    margin: 10,
    flexDirection: 'row',
    width: '90%',
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
      borderWidth: 0,
      height: 38,
      width: 190,
      backgroundColor: gender === 'M' ? 'skyblue' : '#cdcdcd',
    };
  },

  buttonContent2: (gender) => {
    return {
      borderWidth: 0,
      height: 38,
      width: 190,
      marginLeft: '7%',
      backgroundColor: gender === 'F' ? 'skyblue' : '#cdcdcd',
    };
  },

  GenderButtonText: {
    color: 'white',
  },

  ViewContainer: {
    width: '100%',
    marginRight: '-6%',
    marginTop: '1%',
  },
  PickerContainer: {
    width: '100%',
  },
  checkIdBtn: {
    width: 80,
    height: 30,
    marginTop: '2%',
    marginLeft: '3%',
    marginRight: 10,
    backgroundColor: '#cdcdcd',
    borderRadius: 4,
    borderWidth: 0,
  },

  birthBtn: {
    width: 80,
    height: 30,
    alignItems: 'center',
    marginLeft: '3%',
    marginRight: '7%',
    backgroundColor: '#cdcdcd',
    borderRadius: 4,
    borderWidth: 0,
  },
});

const SplashScreenStyles = StyleSheet.create({
  text: {
    top: 10,
    fontSize: 16,
    fontWeight: '800',
  },
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
    flex: 4,
    width: '100%',
    paddingHorizontal: 20,
    marginLeft: 35,
    // height: 300,
    // paddingVertical: 30,
    // justifyContent: 'flex-start',
  },
  textTitle: {
    marginRight: 230,
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textDetail: {fontSize: Platform.OS === 'ios' ? 20 : 16},
  textInterval: {marginTop: Platform.OS === 'ios' ? 10 : 5},
  mealButtonView: {
    flex: 5,
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
    width: Platform.OS === 'ios' ? '40%' : '35%',
    height: '75%',
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    //borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealButtonText: {fontSize: Platform.OS === 'ios' ? 15 : 12},
  maealButtonImage: {width: 65, height: 65, marginTop: 5},
  maealButtonImagMorning: {width: 82, height: 65, marginTop: 5},
  maealButtonImagSnack: {width: 55, height: 72, marginTop: 5},
  nuturitionInputContainer: {
    flex: 6,
    width: '80%',
    justifyContent: 'center',
  },
  nuturitionInputSubject: {fontSize: 27},
  nuturitionInput: {
    width: '100%',
    backgroundColor: 'lightgrey',
    height: Platform.OS === 'ios' ? '15%' : 40,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: Platform.OS === 'ios' ? '4%' : '2%',
    marginRight: '5%',
  },
  nuturitionTitle: {fontSize: 16, marginBottom: Platform.OS === 'ios' ? 10 : 0},
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
    height: Platform.OS === 'ios' ? '70%' : '80%',
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
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
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
    //
    // backgroundColor: 'skyblue',
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
    marginTop: 20,
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

  iconView: {
    borderWidth: 2,
    marginRight: 8,
    padding: 2,
    borderRadius: 30,
  },

  includeView: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

const DietScreenStyle = StyleSheet.create({
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

const DietModalStyles = StyleSheet.create({
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
    height: Platform.OS === 'ios' ? '60%' : '80%',
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
  modalContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  foodTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },

  modalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    margin: Platform.OS === 'ios' ? 0 : 15,
  },
});

const DialysisScreenStyle = StyleSheet.create({
  basicTextInput: {
    width: '70%',
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: '1%',
    marginRight: '5%',
    //borderBottomWidth: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  basicView: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 40,
  },
  buttonContent: (edema) => {
    return {
      marginTop: 18,
      width: 30,
      height: 30,
      backgroundColor: edema === '1' ? 'skyblue' : 'white',
    };
  },
  buttonContent2: (edema) => {
    return {
      marginTop: 18,
      width: 30,
      height: 30,
      backgroundColor: edema === '2' ? 'skyblue' : 'white',
    };
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
  DietScreenStyle,
  DietModalStyles,
  DialysisScreenStyle,
  BarStyle,
};
