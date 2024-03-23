import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        navigate('./profil')
    }

    return (
        <li>
            <img onClick={logout} src="./img/icons/logout.svg" alt="logout" />
        </li>
    )
}