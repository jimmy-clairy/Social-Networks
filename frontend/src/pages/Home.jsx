import { useEffect, useContext, useState } from "react"
import { InfoContext } from '../Context/InfoContext'
import { URL_API_GET_POSTS } from "../utils/url_api";
import fetchData from "../utils/fetchData";
import Cards from "../components/Cards";

export default function Home() {
    const { setPostsCTX } = useContext(InfoContext)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getPosts() {
            const url = URL_API_GET_POSTS;
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            const data = await fetchData(url, options);
            setPostsCTX(data.posts)
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