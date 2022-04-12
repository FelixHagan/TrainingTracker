import { combineReducers } from "redux";
import workoutReducer from "./workoutReducer";

export default combineReducers({
    workout: workoutReducer
});