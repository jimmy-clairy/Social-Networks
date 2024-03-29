import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UpLoadImg from "./UpLoadImg";
import { putUser } from "../../actions/user.actions";
import { getLocal } from "../../utils/localStorage";

export default function UpdateProfil() {

    const userData = useSelector((state) => state.userReducer);
    const token = getLocal('token')
    const dispatch = useDispatch()
    const [bio, setBio] = useState('')

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
                </div>
            </div>
        </div>
    );
}
