import * as actionTypes from './actionTypes';
import axios from 'axios';



export const authStart = () => ({
    type: actionTypes.AUTH_START
})

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId

})

export const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error
})

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

//implement auto logout when token expires
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignedUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        //default url is for signin UP mode
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2eH_-01h9n6fhqCJ-RJNA76EshJX576o'
        if (!isSignedUp) {
            //switch to sign in mode
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2eH_-01h9n6fhqCJ-RJNA76EshJX576o'
        }
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(rej => {
                dispatch(authFail(rej.response.data.error))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() / 1000)))
            }
        }
    }
}