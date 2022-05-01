import { combineReducers } from "redux";
import workoutReducer from "./workoutReducer";
import authReducer from "./authReducer";

export default combineReducers({
    workout: workoutReducer,
    auth: authReducer
});