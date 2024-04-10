import { getLocal } from "../utils/localStorage";
import { URL_POSTS } from "../utils/url_api";

export const GET_POSTS = "GET_POSTS"
export const LIKE_POST = "LIKE_POST"
export const UNLIKE_POST = "UNLIKE_POST"

export const getPosts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(URL_POSTS)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json()
            dispatch({ type: GET_POSTS, payload: data })
            return data
        } catch (error) {
            console.log("Error fetching posts:", error);
            throw error
        }
    }
}

export const likePost = (postId) => {
    const token = getLocal('token')
    const userId = getLocal('userId')

    return async (dispatch) => {
        try {
            const options = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            };
            const response = await fetch(`${URL_POSTS}/like/${postId}`, options)

            if (!response.ok) {
                throw new Error(`Failed to fetch user with ID ${postId}. Status: ${response.status}`);
            }

            dispatch({ type: LIKE_POST, payload: { postId, userId } })

        } catch (error) {
            console.error("Error fetching user:", error);
            throw error
        }
    }
}
export const unlikePost = (postId) => {
    const token = getLocal('token')
    const userId = getLocal('userId')
    return async (dispatch) => {
        try {
            const options = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            };
            const response = await fetch(`${URL_POSTS}/unlike/${postId}`, options)

            if (!response.ok) {
                throw new Error(`Failed to fetch user with ID ${postId}. Status: ${response.status}`);
            }

            dispatch({ type: UNLIKE_POST, payload: { postId, userId } })

        } catch (error) {
            console.error("Error fetching user:", error);
            throw error
        }
    }
}