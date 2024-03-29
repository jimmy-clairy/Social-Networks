import { URL_USER } from "../utils/url_api";

export const GET_USER = "GET_USER"
export const PUT_USER = "PUT_USER"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"

export const getUser = (userId, token) => {

    return async (dispatch) => {
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            };
            const response = await fetch(`${URL_USER}${userId}`, options)

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

export const putUser = (userId, token, bio) => {
    return async (dispatch) => {
        try {
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ bio })
            };

            const response = await fetch(`${URL_USER}${userId}`, options);

            const data = await response.json();

            dispatch({ type: PUT_USER, payload: data });
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    };
};

export const uploadUserImg = (token, formData) => {
    return async (dispatch) => {
        try {
            const options = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            };

            const response = await fetch(`${URL_USER}upload`, options);

            const { picture } = await response.json();

            dispatch({ type: UPLOAD_PICTURE, payload: picture });
        } catch (error) {
            console.error("Error upload img user:", error);
            throw error;
        }
    };
};