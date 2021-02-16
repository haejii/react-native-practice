import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  loading: {
    fontSize: 24,
    fontWeight: '800',
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
  mealButtonContainer: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mealButton: {
    width: '35%',
    height: '70%',
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
