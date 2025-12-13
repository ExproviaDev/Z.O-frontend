'use client'
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from './userSlice';

export const fetchUserData = (dispatch) => {
  dispatch(loginStart());
  axios
    .get('/api/auth/login') 
    .then((response) => {
      dispatch(loginSuccess(response.data)); 
    })
    .catch((error) => {
      dispatch(loginFailure(error.message)); 
    });
};
