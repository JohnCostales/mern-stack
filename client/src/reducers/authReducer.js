import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from 'lodash.isempty'

const initialState = {
    isAutheticated: false,
    user: {},
    // hello: 'test'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                // add to state
                ...state,
                // fill user with userData
                isAutheticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}