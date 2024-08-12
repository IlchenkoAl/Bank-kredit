import axiosApi from "../../axiosApi";

// Action Types
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const CLEAR_REGISTER_ERRORS = 'CLEAR_REGISTER_ERRORS';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

export const LOGOUT_USER = 'LOGOUT_USER';


// Action Creators
const registerUserRequest = () => ({ type: REGISTER_USER_REQUEST });
const registerUserSuccess = user => ({ type: REGISTER_USER_SUCCESS, payload: user });
const registerUserFailure = error => ({ type: REGISTER_USER_FAILURE, payload: error });
export const clearRegisterErrors = () => ({ type: CLEAR_REGISTER_ERRORS });

const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginUserSuccess = user => ({ type: LOGIN_USER_SUCCESS, payload: user });
const loginUserFailure = error => ({ type: LOGIN_USER_FAILURE, payload: error });


export const registerUser = userData => {
    return async dispatch => {
        dispatch(registerUserRequest());
        try {
            const response = await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerUserFailure(e.response.data));
            }
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        dispatch(loginUserRequest());
        try {
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data.user));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginUserFailure(e.response.data));
            }
        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = { 'Authorization': token };
            await axiosApi.delete('/users/sessions', { headers });
            dispatch({ type: LOGOUT_USER });
        } catch (e) {
            throw e;
        }
    };
};
