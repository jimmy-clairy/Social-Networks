// UpdateProfil.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UpLoadImg from "./UpLoadImg";
import { putUser } from "../../actions/user.actions";
import { getLocal } from "../../utils/localStorage";

export default function UpdateProfil() {
    const [bio, setBio] = useState('')
    const dispatch = useDispatch()
    const token = getLocal('token')

    const [updateForm, setUpdateForm] = useState(true)
    const userData = useSelector((state) => state.userReducer);
    const [profilePicture, setProfilePicture] = useState('./uploads/profil/random-user.png');

    useEffect(() => {
        if (userData && userData.picture) {
            setProfilePicture(userData.picture);
        }
    }, [userData]);

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('bio', bio);

        dispatch(putUser(userData._id, token, formData))
        setUpdateForm(!updateForm)
    }

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
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Bio</h3>
                        {updateForm ?
                            (
                                <>
                                    <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                    <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                                </>
                            ) : (
                                <>
                                    <textarea
                                        type="text"
                                        defaultValue={userData.bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                    <button onClick={handleUpdate}>Modifier bio</button>
                                </>)}
                    </div>
                </div>
            </div>
        </div>
    );
}
