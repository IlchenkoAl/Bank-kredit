import {
    SET_CALCULATOR_DATA,
    CALCULATE_LOAN_SUCCESS,
    CALCULATE_LOAN_FAILURE
} from '../actions/actionTypes';

const initialState = {
    cost: 0,
    initialPayment: 0,
    term: 0,
    interestRate: 9.6,
    monthlyPayment: 0,
    totalPayment: 0,
    requiredIncome: 0,
    error: null
};

export const calculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CALCULATOR_DATA:
            return {
                ...state,
                ...action.payload
            };
        case CALCULATE_LOAN_SUCCESS:
            return {
                ...state,
                monthlyPayment: action.payload.monthlyPayment,
                totalPayment: action.payload.totalPayment,
                requiredIncome: action.payload.requiredIncome,
                error: null
            };
        case CALCULATE_LOAN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
