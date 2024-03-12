import { useState } from "react"

export default function UpLoadImg() {
    const [file, setFile] = useState(null)
    function handlePicture(params) {

    }

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer d'image</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg , .png , .webp"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    )
}