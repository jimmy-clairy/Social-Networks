import { NavLink } from "react-router-dom"

export default function LeftNav() {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icon-bis">
                    <NavLink to='/' className={({ isActive }) => `${isActive && 'active-left-nav'}`}>
                        <img src="./img/icons/home.svg" alt="home" />
                    </NavLink>
                    <br />
                    <NavLink to='/trending' className={({ isActive }) => `${isActive && 'active-left-nav'}`} >
                        <img src="./img/icons/rocket.svg" alt="rocket" />
                    </NavLink>
                    <br />
                    <NavLink to='/profil' className={({ isActive }) => `${isActive && 'active-left-nav'}`} >
                        <img src="./img/icons/user.svg" alt="user" />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}