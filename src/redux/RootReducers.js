import { combineReducers } from "redux";
import { userReducer, productReducer } from "./Reducers";

const rootReducers = combineReducers({
    userReducer, productReducer
})

export default rootReducers