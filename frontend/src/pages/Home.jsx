import { useEffect, useState, useContext } from "react"
import { InfoContext } from '../Context/InfoContext';
import { URL_API_GET_POSTS, URL_API_GET_USER } from "../utils/url_api";
import fetchData from "../utils/fetchData";
import Cards from "../components/Cards";

export default function Home() {
    const { userInfoCTX, setUserInfoCTX } = useContext(InfoContext)
    const [posts, setPosts] = useState([])

    useEffect(() => {

        if (userInfoCTX._id) {
            async function getUser() {
                const url = `${URL_API_GET_USER}/${userInfoCTX._id}`;
                const options = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                };
                const data = await fetchData(url, options);
                setUserInfoCTX(data)
            }
            getUser()
        }

        async function getPosts() {
            const url = URL_API_GET_POSTS;
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            const data = await fetchData(url, options);
            setPosts(data.posts)
        }
        getPosts()
    }, [])


    return (
        <div className="home">
            home
            {posts.map((item) => <Cards key={item._id} item={item} />)}
        </div>
    )
}