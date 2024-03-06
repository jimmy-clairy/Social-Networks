import { useState } from "react"
import SignUpForm from "./SignUpForm"
import SignInFrom from "./SignInForm"

export default function Log({ signIn }) {

    const [logModal, setLogModal] = useState(signIn)

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        className={logModal ? "active-btn" : null}
                        onClick={() => setLogModal(true)}>S'inscrire
                    </li>
                    <li
                        className={logModal ? null : "active-btn"}
                        onClick={() => setLogModal(false)}>Se connecter
                    </li>
                </ul>
                {logModal ? <SignUpForm /> : <SignInFrom />}
            </div>
        </div>
    )
}