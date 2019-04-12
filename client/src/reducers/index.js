import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import blogReducer from './blogReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    blog: blogReducer
})