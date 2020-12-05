import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginField: {
    width: '80%',
    backgroundColor: 'white',
    height: '5%',
    fontSize: 16,
    marginBottom: '1%',
  },
  loginButtonContainer: {
    marginTop: '3%',
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-evenly',
  },
  loginButton: {
    marginTop: '2%',
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'teal',
  },
  loading: {
    fontSize: 24,
    fontWeight: '800',
  },
});

export default styles;
