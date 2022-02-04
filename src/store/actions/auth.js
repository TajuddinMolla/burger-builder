import * as actionType from './actionTypes'
import axios from 'axios';
import { Navigate } from 'react-router';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    };
}

export const authSuccess = (token, localId) => {

    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: localId
    };
}

export const authFail = () => {
    return {
        type: actionType.AUTH_FAIL
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('localId');
    return {
        type: actionType.AUTH_LOGOUT
    }
}

export const checkExpireTime = (expireTime) => {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTime * 1000);
    }
}
export const checkSignUpSign = () => {
    const localStorageToken = localStorage.getItem('token');
    return dispatch => {
        if (!localStorageToken) {
            dispatch(logout());
        } else {
            const localStorageExpireDate = new Date(localStorage.getItem('expireDate'));
            const localStorageLocalId = localStorage.getItem('localId');
            if (localStorageExpireDate < new Date()) {
                console.log(localStorageExpireDate);
                dispatch(logout());
            } else {
                dispatch(authSuccess(localStorageToken, localStorageLocalId));
            }

        }

    }
}


export const auth = (email, pass, isSignUp) => {

    return dispatch => {
        dispatch(authStart());

        const userData = {
            email: email,
            password: pass,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYGprEKCLHsnks7iAzvPJYAkjvt8P14Ho';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYGprEKCLHsnks7iAzvPJYAkjvt8P14Ho'
        }
        axios.post(url, userData)
            .then(response => {
                let expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expireDate', expireDate)
                localStorage.setItem('localId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkExpireTime(response.data.expiresIn));

            })
            .catch(error => {
                alert(error.response.data.error.message);
                dispatch(authFail())
            })
    };
}