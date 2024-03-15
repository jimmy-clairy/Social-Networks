export const GET_USER = "GET_USER"

export const getUser = (userId, token) => {

    return async (dispatch) => {
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            };
            const response = await fetch(`http://localhost:5000/api/user/${userId}`, options)

            if (!response.ok) {
                throw new Error(`Failed to fetch user with ID ${userId}. Status: ${response.status}`);
            }

            const data = await response.json()

            dispatch({ type: GET_USER, payload: data })
            return data
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error
        }
    }
}