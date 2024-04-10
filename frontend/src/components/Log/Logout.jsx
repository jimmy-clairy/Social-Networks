import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/user.actions";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        dispatch(logoutUser())
        navigate('./profil')
    }

    return (
        <li>
            <img onClick={logout} src="./img/icons/logout.svg" alt="logout" />
        </li>
    )
}