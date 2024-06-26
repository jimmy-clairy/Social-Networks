import { getLocal } from "../utils/localStorage";
import { URL_POSTS } from "../utils/url_api";

// Post
export const GET_POSTS = "GET_POSTS"
export const LIKE_POST = "LIKE_POST"
export const UNLIKE_POST = "UNLIKE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST = "DELETE_POST"

// Comments
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

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

export const addComment = (text, postId) => {
    const token = getLocal('token')

    return async (dispatch) => {
        try {
            const options = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ text })
            };
            const response = await fetch(`${URL_POSTS}comment/${postId}`, options)

            if (!response.ok) {
                throw new Error(`Failed to add comment with ID ${postId}. Status: ${response.status}`);
            }

            dispatch({ type: ADD_COMMENT, payload: { postId } })

        } catch (error) {
            console.error("Error add comment:", error);
            throw error
        }
    }
}
export const editComment = (postId, commentId, text) => {
    const token = getLocal('token')

    return async (dispatch) => {
        try {
            const options = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ text, commentId })
            };
            const response = await fetch(`${URL_POSTS}edit-comment/${postId}`, options)

            if (!response.ok) {
                throw new Error(`Failed to edit comment with ID ${postId}. Status: ${response.status}`);
            }

            dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } })

        } catch (error) {
            console.error("Error edit comment:", error);
            throw error
        }
    }
}
export const deleteComment = (postId, commentId) => {
    const token = getLocal('token')

    return async (dispatch) => {
        try {
            const options = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ commentId })
            };
            const response = await fetch(`${URL_POSTS}delete-comment/${postId}`, options)

            if (!response.ok) {
                throw new Error(`Failed to delete comment with ID ${postId}. Status: ${response.status}`);
            }

            dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } })

        } catch (error) {
            console.error("Error delete comment:", error);
            throw error
        }
    }
}