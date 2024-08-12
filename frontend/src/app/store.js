import {configureStore} from '@reduxjs/toolkit';
import usersReducers from "../store/reducers/usersReducers";
import {calculatorReducer} from "../store/reducers/calculatorsReducer";

export const store = configureStore({
    reducer: {
        users: usersReducers,
        calculator: calculatorReducer
    },
});

export default store;
