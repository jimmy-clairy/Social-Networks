import Log from '../components/Log/Auth'
import UpdateProfil from '../components/Profil/UpdateProfil'

export default function Profil() {
    console.log('Profil');
    const token = JSON.parse(localStorage.getItem('token'))

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