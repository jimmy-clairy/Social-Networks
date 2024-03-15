import { useSelector } from "react-redux";

export default function Home() {
    console.log('Home');
    const posts = useSelector((state) => state.postReducer)
    console.log(posts);
    return (
        <div className="home">
            <h1>Home</h1>
        </div>
    )
}