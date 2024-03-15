import { useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UpLoadImg from "./UpLoadImg";

export default function UpdateProfil() {
    const user = useSelector((state) => state.userReducer)

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {user.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={'./uploads/profil/random-user.png'} alt="user-pic" />
                    <UpLoadImg />
                </div>
            </div>
        </div>
    )
}