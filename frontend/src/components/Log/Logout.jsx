import { useContext } from "react";
import { InfoContext } from '../../Context/InfoContext'
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { setUserInfoCTX } = useContext(InfoContext)
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token')
        setUserInfoCTX({})
        navigate('./profil')
    }
    return (
        <li>
            <img onClick={logout} src="./img/icons/logout.svg" alt="logout" />
        </li>
    )
}