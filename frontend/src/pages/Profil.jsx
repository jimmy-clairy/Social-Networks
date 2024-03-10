import Log from '../components/Log/Auth'

export default function Profil() {
    const token = JSON.parse(localStorage.getItem('token'))

    return (
        <div className="profil-page">

            {token ? <h1>UPDATE PAGE</h1> :

                <div className="log-container">
                    <Log signIn={true} />
                    <div className="img-container">
                        <img src="./img/log.svg" alt="img-log" />
                    </div>
                </div>}

        </div>
    )
}