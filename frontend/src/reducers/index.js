import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import usersReducer from "./users.reducer";

export default combineReducers({
    authReducer,
    userReducer,
    usersReducer,
    postReducer
})