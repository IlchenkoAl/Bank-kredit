import {
    CREATE_CALCULATION_SUCCESS,
    DELETE_CALCULATION_SUCCESS,
    EDIT_CALCULATION_SUCCESS,
    FETCH_CALCULATIONS_FAILURE,
    FETCH_CALCULATIONS_REQUEST,
    FETCH_CALCULATIONS_SUCCESS
} from '../actionTypes';

const initialState = {
    calculations: [],
    loadingCalculations: false,
    error: null,
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CALCULATIONS_REQUEST:
            return {
                ...state,
                loadingCalculations: true,
                error: null
            };
        case FETCH_CALCULATIONS_SUCCESS:
            return {
                ...state,
                loadingCalculations: false,
                calculations: action.payload
            };
        case FETCH_CALCULATIONS_FAILURE:
            return {
                ...state,
                loadingCalculations: false,
                error: action.payload
            };
        case CREATE_CALCULATION_SUCCESS:
            return {
                ...state,
                calculations: [...state.calculations, action.payload]
            };
        case EDIT_CALCULATION_SUCCESS:
            return {
                ...state,
                calculations: state.calculations.map(calc =>
                    calc._id === action.payload._id ? action.payload : calc
                )
            };
        case DELETE_CALCULATION_SUCCESS:
            return {
                ...state,
                calculations: state.calculations.filter(calc => calc._id !== action.payload)
            };
        default:
            return state;
    }
};
