import { NavLink } from "react-router-dom";
import Logout from "./log/Logout";
import { useSelector } from "react-redux";

export default function Navbar() {
    const token = localStorage.getItem('token')
    const userData = useSelector((state) => state.userReducer)

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to='/'>
                        <div className="logo">
                            <img src="/vite.svg" alt="vite" />
                            <h3>Sacial Networks</h3>
                        </div>
                    </NavLink>
                </div>
                {token ?
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink to='/profil'>
                                <h5>Bienvenue {userData.pseudo}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                    :
                    <ul>
                        <li></li>
                        <li>
                            <NavLink to='/profil'>
                                <h5>Bienvenue</h5>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/profil'>
                                <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    )
}