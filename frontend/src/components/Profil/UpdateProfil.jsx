// UpdateProfil.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UpLoadImg from "./UpLoadImg";

export default function UpdateProfil() {
    const userData = useSelector((state) => state.userReducer);
    const [profilePicture, setProfilePicture] = useState('./uploads/profil/random-user.png');

    useEffect(() => {
        if (userData && userData.picture) {
            setProfilePicture(userData.picture);
        }
    }, [userData]);

    const handleProfilePictureUpdate = (newPicture) => {
        setProfilePicture(newPicture);
    };

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={profilePicture} alt="user-pic" />
                    <UpLoadImg onProfilePictureUpdate={handleProfilePictureUpdate} />
                </div>
            </div>
        </div>
    );
}
