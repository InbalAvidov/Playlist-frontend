import { userService } from '../service/user.service.js'

export const SET_USER = 'SET_USER'

const initialState = {
    // user: null
    user: userService.getLoggedinUser()
}


export function userReducer(state = initialState, action) {
    // console.log('user-reducer, user', action.user)
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        default:
            return state
    }
}


