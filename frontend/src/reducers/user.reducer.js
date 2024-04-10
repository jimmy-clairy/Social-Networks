import { FOLLOW_USER, GET_USER, LOGOUT_USER, PUT_USER, UNFOLLOW_USER, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case PUT_USER:
            return {
                ...state,
                bio: action.payload
            }
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            }
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idToFollow, ...state.following]
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id) => id !== action.payload.idToFollow)
            }
        case LOGOUT_USER:
            return action.payload;

        default:
            return state;
    }
}