import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UpLoadImg from "./UpLoadImg";
import { putUser } from "../../actions/user.actions";
import { getLocal } from "../../utils/localStorage";
import { dateParser } from "../../utils/Utils";
import FollowHandler from "./followHandler";

export default function UpdateProfil() {

    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const token = getLocal('token')
    const dispatch = useDispatch()
    const [bio, setBio] = useState('')
    const [followingPopup, setFollowingPopup] = useState(false)
    const [followersPopup, setFollowersPopup] = useState(false)

    const [updateForm, setUpdateForm] = useState(true)

    const handleUpdate = () => {
        dispatch(putUser(userData._id, token, bio))
        setUpdateForm(!updateForm)
    }

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UpLoadImg />
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
                                    <button onClick={handleUpdate}>Valider modifications</button>
                                </>)}
                    </div>
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={() => setFollowingPopup(true)}>Abonnements : {userData.following ? userData.following.length : "0"}</h5>
                    <h5 onClick={() => setFollowersPopup(true)} >Abonnés : {userData.followers ? userData.followers.length : "0"}</h5>
                </div>
            </div>
            {followingPopup && <div className="popup-profil-container">
                <div className="modal">
                    <h3>Abonnements</h3>
                    <span onClick={() => setFollowingPopup(false)} className="cross">&#10005;</span>
                    <ul>
                        {usersData
                            .filter(user => userData.following.includes(user._id))
                            .map(user => (
                                <li key={user._id}>
                                    <img src={user.picture} alt="user pic" />
                                    <h4>{user.pseudo}</h4>
                                    <div className="follow-handler">
                                        <FollowHandler idToFollow={user._id} />
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>}
            {followersPopup && <div className="popup-profil-container">
                <div className="modal">
                    <h3>Abonnés</h3>
                    <span onClick={() => setFollowersPopup(false)} className="cross">&#10005;</span>
                    <ul>
                        {usersData
                            .filter(user => userData.followers.includes(user._id))
                            .map(user => (
                                <li key={user._id}>
                                    <img src={user.picture} alt="user pic" />
                                    <h4>{user.pseudo}</h4>
                                    <div className="follow-handler">
                                        <FollowHandler idToFollow={user._id} />
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>}
        </div>
    );
}
