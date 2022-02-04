import * as actionType from '../actions/actionTypes'
const localStorageToken = localStorage.getItem('token');
const localStorageLocalId = localStorage.getItem('localId');
const initialState = {
    token: localStorageToken,
    userId: localStorageLocalId,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionType.AUTH_SUCCESS:
            
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                loading: false,
            }
        case actionType.AUTH_FAIL:

            return {
                ...state,
                loading: false
            }
        case actionType.AUTH_LOGOUT:

            return {
                ...state,
                token: null,
                userId: null,
                loading: false,
            }
        default:
            return state;
    }
}

export default authReducer;