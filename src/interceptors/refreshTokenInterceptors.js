import axios from 'axios';

import {store} from '../redux/configureStore';

import {updateJwt} from '../redux/slices/authSlice';

axios.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    const originalRequest = error.config;

    if (originalRequest.url !== '/auth/google' && error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const loginState = store.getState().auth;

        const response = await axios.post(
          'http://192.168.0.8:10000/auth/refresh-token',
          {token: loginState.session.refreshToken},
        );

        if (response.status === 200) {
          axios.defaults.headers.common.Authorization =
            'Bearer ' + response.data.access_token;

          store.dispatch(updateJwt(response.data.access_token));

          originalRequest.headers.Authorization =
            'Bearer ' + response.data.access_token;

          return await axios.request(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  },
);
