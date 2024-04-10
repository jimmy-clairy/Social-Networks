import LeftNav from '../components/LeftNav';
import Thread from "../components/Thread";

export default function Home() {
    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <Thread />
            </div>
        </div>
    )
}