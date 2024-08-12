import {configureStore} from '@reduxjs/toolkit';
import usersReducers from "../store/reducers/usersReducers";

export const store = configureStore({
    reducer: {
        users: usersReducers,
    },
});

export default store;
