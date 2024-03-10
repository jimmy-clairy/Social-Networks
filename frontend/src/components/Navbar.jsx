import { useContext } from "react";
import { InfoContext } from '../Context/InfoContext';
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";

export default function Navbar() {
    const token = localStorage.getItem('token')
    const { userInfoCTX } = useContext(InfoContext)

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
                {token ? <ul>
                    <li></li>
                    <li className="welcome">
                        <NavLink to='/profil'>
                            <h5 style={{ color: userInfoCTX?.ifAdmin ? 'crimson' : 'green' }}>Bienvenue {userInfoCTX?.pseudo}</h5>
                        </NavLink>
                    </li>
                    <Logout />
                </ul> :
                    <ul>
                        <li></li>
                        <li>
                            <NavLink to='/profil'>
                                <h5>Bienvenue</h5>
                            </NavLink>
                        </li>
                        <li>
                            <img src="./img/icons/login.svg" alt="login" />
                        </li>
                    </ul>}
            </div>
        </nav>
    )
}