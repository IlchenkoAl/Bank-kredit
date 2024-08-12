import axios from 'axios';
export const SET_CALCULATOR_DATA = 'SET_CALCULATOR_DATA';
export const CALCULATE_LOAN_SUCCESS = 'CALCULATE_LOAN_SUCCESS';
export const CALCULATE_LOAN_FAILURE = 'CALCULATE_LOAN_FAILURE';

export const setCalculatorData = (data) => {
    return {
        type: SET_CALCULATOR_DATA,
        payload: data
    };
};

export const calculateLoan = () => async (dispatch, getState) => {
    const { cost, initialPayment, term, interestRate } = getState().calculator;

    const loanAmount = cost - initialPayment;

    try {
        const response = await axios.post('http://localhost:5000/calculate', {
            loanAmount,
            interestRate,
            term
        });

        const { monthlyPayment, totalPayment, requiredIncome } = response.data;

        dispatch({
            type: CALCULATE_LOAN_SUCCESS,
            payload: {
                monthlyPayment,
                totalPayment,
                requiredIncome
            }
        });
    } catch (error) {
        dispatch({
            type: CALCULATE_LOAN_FAILURE,
            payload: error.message
        });
    }
};
