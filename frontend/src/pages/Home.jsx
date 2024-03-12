import { Counter } from "../features/counter/Counter";

export default function Home() {
    console.log('Home');
    return (
        <div className="home">
            <h1>Home</h1>
            <Counter />
        </div>
    )
}