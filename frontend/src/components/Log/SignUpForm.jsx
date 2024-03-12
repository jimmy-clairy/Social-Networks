import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import { URL_API_LOGIN, URL_API_SIGNUP } from "../../utils/url_api";

async function apiRequest(url, user) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return await fetchData(url, options);
}

export default function SignUpForm() {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');
    const [check, setCheck] = useState(false);
    const [errors, setErrors] = useState({
        pseudo: '',
        email: '',
        password: '',
        controlPassword: '',
        check: ''
    });

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if (password !== controlPassword) {
                setErrors({ ...errors, controlPassword: 'Les mots de passe ne correspondent pas' });
            } else if (!check) {
                setErrors({ ...errors, check: 'Veuillez accepter les conditions générales' });
            } else {
                const user = { pseudo, email, password };

                const signUpData = await apiRequest(URL_API_SIGNUP, user);
                if (signUpData.errors) {
                    setErrors({ ...errors, ...signUpData.errors });
                } else {
                    const loginData = await apiRequest(URL_API_LOGIN, user);
                    localStorage.setItem("token", JSON.stringify(loginData.token));
                    localStorage.setItem("userId", JSON.stringify(loginData.userId));
                    navigate("/");
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSignUp} id="sign-up-form">

            <label htmlFor="pseudo">Pseudo</label>
            <input
                id="pseudo"
                onChange={(e) => { setPseudo(e.target.value), setErrors({ ...errors, pseudo: '' }) }}
                value={pseudo}
                autoComplete="username"
                type="text"
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
                onChange={(e) => { setPassword(e.target.value), setErrors({ ...errors, password: '', controlPassword: '' }) }}
                value={password}
                autoComplete="new-password"
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
                autoComplete="new-password"
                type="password"
                name="controlPassword"
                required
            />
            <div className="error">{errors.controlPassword}</div>

            <input
                type="checkbox"
                id="terms"
                onChange={() => { setCheck(!check), setErrors({ ...errors, check: '' }) }}
                checked={check}
            />
            <label htmlFor="terms">
                J'accepte les{" "}
                <a href="#" target="_blank" rel="noopener noreferrer">
                    conditions générales
                </a>
            </label>
            <div className="error">{errors.check}</div>

            <input type="submit" value="Valider inscription" />
        </form>
    );
}
