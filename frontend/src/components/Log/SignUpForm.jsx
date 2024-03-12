import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData"
import { URL_API_LOGIN, URL_API_SIGNUP } from "../../utils/url_api"

async function login(user) {
    const url = URL_API_LOGIN;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return await fetchData(url, options);
}

async function signUp(user) {
    const url = URL_API_SIGNUP;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return await fetchData(url, options)
}

export default function SignUpForm() {
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [controlPassword, setControlPassword] = useState('')
    const [check, setCheck] = useState(false)
    const [errors, setErrors] = useState({
        pseudo: '',
        email: '',
        password: '',
        controlPassword: '',
        check: ''
    })

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            if (password !== controlPassword || !check) {
                if (password !== controlPassword) {
                    setErrors({ ...errors, controlPassword: 'Le mot de passe doit etre identique' })
                }
                if (!check) {
                    setErrors({ ...errors, check: 'Veuillez valider les conditions générales' })
                }

            } else {
                const user = { pseudo, email, password }

                const data = await signUp(user)

                if (data.errors) {
                    return setErrors({ ...errors, pseudo: data.errors.pseudo, email: data.errors.email, password: data.errors.password })
                }

                const userData = await login(user)

                localStorage.setItem("token", JSON.stringify(userData.token));
                localStorage.setItem("userId", JSON.stringify(userData.userId));

                navigate("/")
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form action="" onSubmit={handleSignUp} id="sing-up-form">

            <label htmlFor="pseudo">Pseudo</label>
            <input
                id="pseudo"
                onChange={(e) => { setPseudo(e.target.value), setErrors({ ...errors, pseudo: '' }) }}
                value={pseudo}
                autoComplete="pseudo"
                type="pseudo"
                name="pseudo"
                required
            />
            <div className="error">{errors.pseudo}</div>

            <label htmlFor="email">Email</label>
            <input
                id="email"
                onChange={(e) => { setEmail(e.target.value), setErrors({ ...errors, email: '' }) }}
                value={email}
                autoComplete="email"
                type="email"
                name="email"
                required
            />
            <div className="error">{errors.email}</div>

            <label htmlFor="password">Mot de passe</label>
            <input
                id="password"
                onChange={(e) => { setPassword(e.target.value), setErrors({ ...errors, controlPassword: '', password: '' }) }}
                value={password}
                autoComplete="current-password"
                type="password"
                name="password"
                required
            />
            <div className="error">{errors.password}</div>

            <label htmlFor="controlPassword">Confirmer le mot de passe</label>
            <input
                id="controlPassword"
                onChange={(e) => { setControlPassword(e.target.value), setErrors({ ...errors, controlPassword: '' }) }}
                value={controlPassword}
                autoComplete="current-password"
                type="password"
                name="controlPassword"
                required
            />
            <div className="error">{errors.controlPassword}</div>

            <input type="checkbox" id="terms" onChange={() => { setCheck(!check), setErrors({ ...errors, check: '' }) }} value={check} />
            <label htmlFor="terms">J'accepte les <a href="#" target="_blank" rel="noopener noreferrer">conditions généroles</a></label>
            <div className="error">{errors.check}</div>

            <input type="submit" value="Valider inscription" />
        </form>
    )
}