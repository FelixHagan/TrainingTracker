import { GET_WORKOUTS, SET_LOADING, WORKOUTS_ERROR } from "./types";
import axios from 'axios';

// Get workouts from server
export const getWorkouts = () => async dispatch => {
    try {
        setLoading();

        const res = await axios.get('/api/workouts');

        dispatch({
            type: GET_WORKOUTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: WORKOUTS_ERROR,
            payload: err.response.msg
        })
    }
}

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}