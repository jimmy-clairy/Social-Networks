import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUser } from "../../actions/user.actions";

export default function UpLoadImg({ onProfilePictureUpdate }) {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    const token = JSON.parse(localStorage.getItem('token'));

    const handlePicture = async (e) => {
        e.preventDefault();

        try {
            if (!file) return

            const formData = new FormData();
            formData.append('file', file);

            await dispatch(putUser(userData._id, token, formData));

            onProfilePictureUpdate(URL.createObjectURL(file));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer d'image</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    );
}
