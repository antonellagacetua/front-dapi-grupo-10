import axios from 'axios';
import {store} from '../redux/configureStore';
import {updateJwt} from '../redux/slices/authSlice';

const apiClient = axios.create({
  baseURL: process.env.API_URL,
});

apiClient.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    const originalRequest = error.config;

    if (originalRequest.url !== '/auth/google' && error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          console.log('Attempting to refresh token');
          const loginState = store.getState().auth;
          const response = await apiClient.post('/auth/refresh-token',
            { token: loginState.session.refreshToken },
          );
  
          if (response.status === 200) {
            const newToken = response.data.access_token;
            apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            store.dispatch(updateJwt(newToken));
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return await apiClient.request(originalRequest);
          }
        } catch (error) {
          console.error('Error refreshing token: ', error);
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
