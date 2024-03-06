import { useEffect } from "react"
import { URL_API_GET_POSTS } from "../utils/url_api";
import fetchData from "../utils/fetchData";

export default function Home() {
    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {

        async function fetchPost(params) {
            try {
                const url = URL_API_GET_POSTS;
                console.log(url);
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`,
                    },

                    // body: JSON.stringify(user)
                };
                const data = await fetchData(url, options);
                console.log(data);
            } catch (error) {
                console.log(error);
            }

        }
        fetchPost()
    }, [])

    return (
        <div className=" bg-red-200">Home</div>
    )
}