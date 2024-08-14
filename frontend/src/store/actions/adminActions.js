import axiosApi from "../../axiosApi";
import {
    FETCH_CALCULATIONS_REQUEST,
    FETCH_CALCULATIONS_SUCCESS,
    FETCH_CALCULATIONS_FAILURE,
    CREATE_CALCULATION_SUCCESS,
    EDIT_CALCULATION_SUCCESS,
    DELETE_CALCULATION_SUCCESS
} from '../actionTypes';

export const fetchCalculations = () => async (dispatch) => {
    dispatch({ type: FETCH_CALCULATIONS_REQUEST });

    try {
        const response = await axiosApi.get('/admin/calculators');
        dispatch({
            type: FETCH_CALCULATIONS_SUCCESS,
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_CALCULATIONS_FAILURE,
            payload: error.message
        });
    }
};

export const createCalculation = (data) => async (dispatch) => {
    try {
        const response = await axiosApi.post('/admin/create', data);
        dispatch({
            type: CREATE_CALCULATION_SUCCESS,
            payload: response.data.data
        });
        dispatch(fetchCalculations());
    } catch (error) {
        console.error('Error creating calculation:', error);
    }
};

export const editCalculation = (id, data) => async (dispatch) => {
    try {
        const response = await axiosApi.put(`/admin/edit/${id}`, data);
        dispatch({
            type: EDIT_CALCULATION_SUCCESS,
            payload: response.data.data
        });
        dispatch(fetchCalculations());
    } catch (error) {
        console.error('Error editing calculation:', error);
    }
};

export const deleteCalculation = (id) => async (dispatch) => {
    try {
        await axiosApi.delete(`/admin/delete/${id}`);
        dispatch({
            type: DELETE_CALCULATION_SUCCESS,
            payload: id
        });
        dispatch(fetchCalculations());
    } catch (error) {
        console.error('Error deleting calculation:', error);
    }
};
