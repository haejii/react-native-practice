import React from 'react';
import {Provider} from 'react-redux';
import AuthenticationFlow from './authentication/AuthenticationFlow';
import KakaoLogin from './authentication/KakaoLogin';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      {/* <KakaoLogin /> */}
      <AuthenticationFlow />
    </Provider>
  );
}
