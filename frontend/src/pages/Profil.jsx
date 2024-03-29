import Log from '../components/log/Auth'
import UpdateProfil from '../components/profil/UpdateProfil'
import { getLocal } from '../utils/localStorage'

export default function Profil() {
    const token = getLocal('token')

    return (
        <div className="profil-page">

            {token ? <UpdateProfil /> :

                <div className="log-container">
                    <Log signIn={true} />
                    <div className="img-container">
                        <img src="./img/log.svg" alt="img-log" />
                    </div>
                </div>}

        </div>
    )
}