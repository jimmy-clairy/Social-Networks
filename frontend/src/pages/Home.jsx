import { useSelector } from "react-redux";
import LeftNav from '../components/LeftNav';
import Thread from "../components/Thread";

export default function Home() {
    // const posts = useSelector((state) => state.postReducer)
    // console.log(posts);
    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <Thread />
            </div>
        </div>
    )
}