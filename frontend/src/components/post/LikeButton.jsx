import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getLocal } from "../../utils/localStorage"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { likePost } from "../../actions/post.actions";
import { unlikePost } from "../../actions/post.actions";

export default function LikeButton({ post }) {
    const [liked, setLiked] = useState(false)
    const userId = getLocal('userId')
    const dispatch = useDispatch()

    useEffect(() => {
        if (post.likers.includes(userId)) {
            setLiked(true)
        } else { setLiked(false) }

    }, [userId])


    function like() {
        dispatch(likePost(post._id))
        setLiked(true)
    }

    function unlike() {
        dispatch(unlikePost(post._id))
        setLiked(false)
    }

    return (
        <div className="like-container">
            {userId === null &&
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick >
                    <div>Connectez-vous pour aimer un post !</div>
                </Popup>}
            {userId && liked === false && <img src="./img/icons/heart.svg" onClick={like} alt="like" />}
            {userId && liked && <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />}
            <span>{post.likers.length}</span>
        </div>
    )
}