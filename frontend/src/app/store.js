import {configureStore} from '@reduxjs/toolkit';
import usersReducers from "../store/reducers/usersReducers";
import {calculatorReducer} from "../store/reducers/calculatorsReducer";
import {adminReducer} from "../store/reducers/adminReducers";

export const store = configureStore({
    reducer: {
        users: usersReducers,
        calculator: calculatorReducer,
        admin: adminReducer
    },
});

export default store;
