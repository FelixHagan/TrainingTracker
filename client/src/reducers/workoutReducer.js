import { GET_WORKOUTS, SET_LOADING, WORKOUTS_ERROR, ADD_WORKOUT, UPDATE_WORKOUT, DELETE_WORKOUT, SET_CURRENT, CLEAR_CURRENT, CLEAR_WORKOUTS } from "../actions/types";

const initialState = {
    workouts: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_WORKOUTS: 
            return {
                ...state,
                workouts: action.payload,
                loading: false
            }
        case SET_LOADING: 
            return {
                ...state,
                loading: true
            };
        case ADD_WORKOUT: 
            return {
                ...state,
                workouts: [...state.workouts, action.payload],
                loading: false
            }
        case UPDATE_WORKOUT: 
            return {
                ...state,
                workouts: state.workouts.map((workout) => workout._id === action.payload._id ? action.payload : workout),
                loading: false
            }
        case DELETE_WORKOUT: 
            return {
                ...state,
                workouts: state.workouts.filter((workout) => workout._id !== action.payload),
                loading: false
            }
        case SET_CURRENT: 
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case CLEAR_WORKOUTS:
            return {
                ...state,
                workouts: null,
                current: null,
                error: null
            }
        case WORKOUTS_ERROR: 
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state;
    }
}