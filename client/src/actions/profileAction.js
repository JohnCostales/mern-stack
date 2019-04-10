import axios from 'axios';
import {
  PROFILE_LOADING,
  GET_ERRORS,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE
} from './types';

// Get current profiles.
export const getCurrentProfile = () => dispatch => {
  // Do an action before request
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
