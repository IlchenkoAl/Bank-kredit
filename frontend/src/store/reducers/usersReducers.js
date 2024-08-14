import {
    CLEAR_REGISTER_ERRORS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    CLEAR_LOGIN_ERRORS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,

} from "../actionTypes";

export const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    fetchLoading: false,
    loginError: null,
    error: null, // Общее состояние для ошибок загрузки данных пользователя и обновления данных
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return { ...state, registerLoading: true };
        case REGISTER_USER_SUCCESS:
            return { ...state, registerLoading: false, user: action.payload, registerError: null };
        case REGISTER_USER_FAILURE:
            return { ...state, registerLoading: false, registerError: action.payload };
        case CLEAR_REGISTER_ERRORS:
            return { ...state, registerError: null };
        case LOGIN_USER_REQUEST:
            return { ...state, loginLoading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, loginLoading: false, user: action.payload, loginError: null };
        case LOGIN_USER_FAILURE:
            return { ...state, loginLoading: false, loginError: action.payload };
        case CLEAR_LOGIN_ERRORS:
            return { ...state, loginError: null };
        case LOGOUT_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default usersReducer;
