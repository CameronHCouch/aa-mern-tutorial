import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
// if a returning user has their session token stored in localStorage
  if (localStorage.jwtToken) {
    // sets token as common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // decode token to obtain user's info
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // if user's token has expired, log them out and redirect to login page
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
    // this else is paired with if on line 12
    // if this is a first-time user, start with an empty store
  } else {
    store = configureStore({});
  }

  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});