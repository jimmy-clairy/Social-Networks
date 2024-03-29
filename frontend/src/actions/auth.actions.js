import { setLocal } from "../utils/localStorage"
import { URL_LOGIN } from "../utils/url_api"

export const LOGIN_USER = "LOGIN_USER"

export const loginUser = (user) => {

    return async (dispatch) => {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }
            const response = await fetch(URL_LOGIN, options)

            if (!response.ok) {
                throw new Error(`Failed to fetch user with ID ${user}. Status: ${response.status}`);
            }

            const data = await response.json()

            setLocal('userId', data.userId)
            setLocal('token', data.token)

            dispatch({ type: LOGIN_USER, payload: data })
            return data
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error
        }
    }
}