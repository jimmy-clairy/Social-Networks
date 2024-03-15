export const GET_POSTS = "GET_POSTS"

export const getPosts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:5000/api/post`)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json()
            dispatch({ type: GET_POSTS, payload: data.posts })
            return data
        } catch (error) {
            console.log("Error fetching posts:", error);
            throw error
        }
    }
}