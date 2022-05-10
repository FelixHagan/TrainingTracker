import { GET_WORKOUTS, SET_LOADING, WORKOUTS_ERROR, ADD_WORKOUT, UPDATE_WORKOUT, DELETE_WORKOUT, SET_CURRENT, CLEAR_CURRENT, CLEAR_WORKOUTS, FILTER_WORKOUTS, CLEAR_FILTER } from "./types";
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

// Add new workout
export const addWorkout = (workout) => async (dispatch) => {
    setLoading();
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/workouts', workout, config);

        dispatch({
            type: ADD_WORKOUT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: WORKOUTS_ERROR,
            payload: err.response.statusText
        });
    }
}

// Update workout
export const updateWorkout = (workout) => async (dispatch) => {
    setLoading();
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/workouts/${workout._id}`, workout, config);

        dispatch({
            type: UPDATE_WORKOUT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: WORKOUTS_ERROR,
            payload: err.response.statusText
        });
    }
}

// Delete workout
export const deleteWorkout = (id) => async (dispatch) => {
    setLoading();
    try {
        const res =  await axios.delete(`/api/workouts/${id}`);
        dispatch({
            type: DELETE_WORKOUT,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: WORKOUTS_ERROR,
            payload: err.response.statusText
        });
    }
}

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

// Set current workout
export const setCurrent = (workout) => async dispatch => {
    dispatch({
        type: SET_CURRENT,
        payload: workout
    });
}

// Clear current 
export const clearCurrent = () => async dispatch => {
    dispatch({
        type: CLEAR_CURRENT
    });
}

// Clear workouts
export const clearWorkouts = () => async dispatch => {
    dispatch({
        type: CLEAR_WORKOUTS
    });
}

// Filter workouts
export const filterWorkouts = (text) => async dispatch => {
    dispatch({
        type: FILTER_WORKOUTS,
        payload: text
    });
}

// Clear filter
export const clearFilter = () => async dispatch => {
    dispatch({
        type: CLEAR_FILTER
    });
}