import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    // Find profile
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    // When get profile is fetched
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload, // payload will be empty
        loading: false
      };
    // When user logs out
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
