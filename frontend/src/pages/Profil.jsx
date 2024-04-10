import Log from '../components/log/Auth';
import { useSelector } from "react-redux";
import UpdateProfil from '../components/profil/UpdateProfil';

export default function Profil() {
    const userData = useSelector((state) => state.userReducer)
    return (
        <div className="profil-page">

            {userData._id ? <UpdateProfil /> :

                <div className="log-container">
                    <Log signIn={true} />
                    <div className="img-container">
                        <img src="./img/log.svg" alt="img-log" />
                    </div>
                </div>}

        </div>
    )
}