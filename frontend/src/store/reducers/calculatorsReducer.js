import {CREATE_CALCULATION_SUCCESS,
    DELETE_CALCULATION_SUCCESS,
    EDIT_CALCULATION_SUCCESS} from '../actionTypes';

const initialState = {
    calculations: [],
    loadingCalculations: false,
    error: null,
};

export const calculatorReducer = (state = initialState, action) => {
    switch (action.type) {
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
