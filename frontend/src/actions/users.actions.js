import { URL_USER } from "../utils/url_api";

export const GET_USERS = "GET_USERS"


export const getUsers = () => {

    return async (dispatch) => {
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch(`${URL_USER}`, options)

            if (!response.ok) {
                throw new Error(`Failed to fetch users. Status: ${response.status}`);
            }

            const data = await response.json()

            dispatch({ type: GET_USERS, payload: data })
            return data
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error
        }
    }
}