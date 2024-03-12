import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import { URL_API_LOGIN } from "../../utils/url_api";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = { email, password };

            const url = URL_API_LOGIN;
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };

            const data = await fetchData(url, options);

            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("userId", JSON.stringify(data.userId));

            navigate("/");
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleLogin} id="sign-up-form">

            <label htmlFor="email">Email</label>
            <input
                id="email"
                onChange={(e) => { setEmail(e.target.value), setError('') }}
                value={email}
                autoComplete="email"
                type="email"
                name="email"
            />
            <div className="email error">{error}</div>

            <label htmlFor="password">Password</label>
            <input
                id="password"
                onChange={(e) => { setPassword(e.target.value), setError('') }}
                value={password}
                autoComplete="current-password"
                type="password"
                name="password"
            />
            <div className="password error">{error}</div>

            <input type="submit" value="Se connecter" />
        </form>
    );
}
