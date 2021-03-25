import * as actionTypes from '../actions/actionTypes';


function handleErrorMessage(error){
    const coustomMessages = {
        'INVALID_EMAIL': 'Sorry, your email is invalid',
        'EMAIL_EXISTS': 'Sorry, your email is already taken'
    }
    console.log(error.message)
    return error
}

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
               ...state,
                error: handleErrorMessage(action.error),
                loading: false,        
            }
        default:
            return state
    }
}

export default authReducer