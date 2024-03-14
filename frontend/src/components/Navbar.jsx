import { NavLink } from "react-router-dom";
import Logout from "./log/Logout";

export default function Navbar() {
    console.log('NavBar');
    const token = localStorage.getItem('token')


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
                            <h5>Bienvenue 'Dynamic'</h5>
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
                            <NavLink to='/profil'>
                                <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul>}
            </div>
        </nav>
    )
}