import { GET_WORKOUTS, SET_LOADING, WORKOUTS_ERROR } from "../actions/types";

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