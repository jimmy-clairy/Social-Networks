import { useState } from "react"
import fetchData from "../../utils/fetchData"
import { URL_API_SIGNUP } from "../../utils/url_api"

export default function SignUpForm() {
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = { pseudo, email, password }

            const url = URL_API_SIGNUP;
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };

            const data = await fetchData(url, options);
        } catch (error) {
            console.error(error);
            setError(error.message)
        }
    }
    return (
        <form action="" onSubmit={handleLogin} id="sing-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
                autoComplete="pseudo"
                type="pseudo"
                name="pseudo"
            />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="email"
                type="email"
                name="email"
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
                type="password"
                name="password"
            />
            <input type="submit" value="Se connecter" />
        </form>
    )
}