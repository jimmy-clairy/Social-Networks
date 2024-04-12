import { useDispatch, useSelector } from 'react-redux';
import { getLocal } from '../../utils/localStorage';
import { useState } from 'react';
import FollowHandler from '../profil/FollowHandler';
import { timestampParser } from '../../utils/Utils';

export default function CardComment({ post }) {
    const [text, setText] = useState('')
    const usersData = useSelector((state) => state.usersReducer)
    const dispatch = useDispatch()
    const userId = getLocal('userId')

    const handleComment = () => { }

    console.log(post);
    return (
        <div className="comments-container">
            {post.comments.map((comment) =>
                <div key={comment._id} className={comment.commenterId === userId ? "comment-container client" : "comment-container"}>
                    <div className="left-part">
                        {usersData.map((user) => {
                            if (user._id === comment.commenterId) {
                                return <img key={user._id} src={user.picture} alt="commenter-pic" />
                            }
                            return null;
                        })}
                    </div>
                    <div className="right-part">
                        <div className="comment-header">
                            <div className="pseudo">
                                <h3>{comment.commenterPseudo}</h3>
                                {(comment.commenterId !== userId && userId !== null) && <FollowHandler idToFollow={comment.commenterId} type={'card'} />}
                            </div>
                            <span>{timestampParser(comment.timestamp)}</span>
                        </div>
                        <p>{comment.text}</p>
                    </div>
                </div>)}
        </div>
    )
}