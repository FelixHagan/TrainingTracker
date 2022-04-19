import { GET_WORKOUTS, SET_LOADING, WORKOUTS_ERROR } from "./types";

// Get workouts from server
export const getWorkouts = () => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/api/users');
        const data = res.json();

        dispatch({
            type: GET_WORKOUTS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: WORKOUTS_ERROR,
            payload: err.response.data
        })
    }
}

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}