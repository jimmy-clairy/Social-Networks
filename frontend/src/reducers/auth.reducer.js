import { LOGIN_USER } from "../actions/auth.actions";


const initialState = {};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload;
        default:
            return state;
    }
}