import axios from 'axios';
import { API_BASE_URL } from '@src/configs/AppConfig';
import { message, notification } from 'antd';
import { LocalStoredDataKeys, UserPayload } from '@src/types/UserPayloadType';

import { store } from '@src/store-redux/store';
import { userActions } from '@src/store-redux/slices/user-slice';
import { signOut } from '@firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000
});

// Config
const TOKEN_PAYLOAD_KEY = 'Authorization';

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn' as LocalStoredDataKeys)) {
      // If not logged in, return config
      return config;
    }

    // If logged in, get user data from local storage
    const userData: UserPayload = JSON.parse(
      localStorage.getItem('user' as LocalStoredDataKeys) || ''
    );

    // If user data is not null, add token to request header
    if (userData) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${userData.accessToken}`;
    }

    return config;
  },
  (error) => {
    // notification.error({
    //   message: 'Error'
    // });
    Promise.reject(error);
  }
);

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    let notificationParam = {
      message: 'Something Wrong happened!',
      description: 'Please try again later'
    };

    // Remove token and redirect
    if (error?.response?.status === 401) {
      notificationParam.message = 'Authentication Fail';
      notificationParam.description = 'Please login again';
      notification.error(notificationParam);
      signOut(auth);
    }

    if (error.response?.data?.message) {
      notificationParam.message = error.response.data.message;
    }

    if (error?.response?.status === 404) {
      return Promise.reject(error);
    }

    // if (error?.response?.status === 406) {
    //   notificationParam.message =
    //     'Username, email or contact already associated with another account';
    // }

    // if (error?.response?.status === 500) {
    //   notificationParam.message = 'Internal Server Error';
    // }

    // if (error?.response?.status === 508) {
    //   notificationParam.message = 'Time Out';
    // }

    return Promise.reject(error);
  }
);

export default service;
