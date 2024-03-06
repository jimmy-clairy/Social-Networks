import Log from '../components/Log/Auth'

export default function Profil() {
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log signIn={true} />
                <div className="img-container">
                    <img src="./img/log.svg" alt="img-log" />
                </div>
            </div>
        </div>
    )
}