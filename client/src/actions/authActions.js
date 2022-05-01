import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS, SET_LOADING } from "./types";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

// Load User
export const loadUser = () => async dispatch => {
    setLoading();

    
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

const loadTheUser = async (dispatch) => {
    setLoading();
    
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const registerUser = (formData) => async dispatch => {
    setLoading();
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/users', formData, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        loadTheUser(dispatch);
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        });
    }
}

// Login User
export const loginUser = (formData) => async dispatch => {
    setLoading();
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/auth', formData, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        loadTheUser(dispatch);
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        });
    }
}

// Logout
export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
}

// Clear Errors
export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
}

// Set Loading
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

