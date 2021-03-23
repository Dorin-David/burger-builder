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
        if(!isSignedUp){
           //switch to sign in mode
           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2eH_-01h9n6fhqCJ-RJNA76EshJX576o'
        }
        axios.post(url, authData)
        .then(res => {
            console.log(res)
            dispatch(authSuccess(res.data.idToken, res.data.localId))
        })
        .catch(rej => {
            console.log(rej)
            dispatch(authFail(rej))
        })
    }
}