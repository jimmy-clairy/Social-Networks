import { getLocal } from "../utils/localStorage";
import { URL_POSTS } from "../utils/url_api";

export const GET_POSTS = "GET_POSTS"
export const LIKE_POST = "LIKE_POST"
export const UNLIKE_POST = "UNLIKE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST = "DELETE_POST"

export const getPosts = (num) => {
    return async (dispatch) => {
        try {
            const response = await fetch(URL_POSTS)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json()
            const array = data.slice(0, num)

            dispatch({ type: GET_POSTS, payload: array })
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

export const updatePost = (postId, message) => {
    const token = getLocal('token')

    return async (dispatch) => {
        try {
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ message })
            };
            const response = await fetch(`${URL_POSTS}${postId}`, options)

            if (!response.ok) {
                throw new Error(`Failed to modify user with ID ${postId}. Status: ${response.status}`);
            }

            dispatch({ type: UPDATE_POST, payload: { postId, message } })

        } catch (error) {
            console.error("Error fetching user:", error);
            throw error
        }
    }
}

export const deletePost = (postId) => {
    const token = getLocal('token')

    return async (dispatch) => {
        try {
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            };
            const response = await fetch(`${URL_POSTS}${postId}`, options)

            if (!response.ok) {
                throw new Error(`Failed to delete post with ID ${postId}. Status: ${response.status}`);
            }

            dispatch({ type: DELETE_POST, payload: { postId } })

        } catch (error) {
            console.error("Error delete post:", error);
            throw error
        }
    }
}