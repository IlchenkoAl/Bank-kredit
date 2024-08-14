import {
    SET_CALCULATOR_DATA,
    CALCULATE_LOAN_SUCCESS,
    CALCULATE_LOAN_FAILURE,
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAILURE,

} from '../actionTypes';

const initialState = {
    cost: 0,
    initialPayment: 0,
    term: 0,
    interestRate: 9.6,
    monthlyPayment: 0,
    totalPayment: 0,
    requiredIncome: 0,
    error: null,
    emailSending: false,
    emailSent: false,
    calculations: [],
    loadingCalculations: false,
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
                monthlyPayment: action.payload.monthlyPayment.toString(),
                totalPayment: action.payload.totalPayment.toString(),
                requiredIncome: action.payload.requiredIncome.toString(),
                error: null
            };
        case CALCULATE_LOAN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case SEND_EMAIL_REQUEST:
            return {
                ...state,
                emailSending: true,
                emailSent: false,
                error: null
            };
        case SEND_EMAIL_SUCCESS:
            return {
                ...state,
                emailSending: false,
                emailSent: true,
                error: null
            };
        case SEND_EMAIL_FAILURE:
            return {
                ...state,
                emailSending: false,
                emailSent: false,
                error: action.payload
            };
            default:
            return state;
    }
};
