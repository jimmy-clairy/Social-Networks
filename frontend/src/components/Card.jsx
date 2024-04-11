import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateParser, isEmpty } from "../utils/Utils";
import FollowHandler from "./profil/FollowHandler";
import LikeButton from "./post/LikeButton";
import { getLocal } from "../utils/localStorage";
import { updatePost } from "../actions/post.actions";

export default function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdate, setIsUpdate] = useState(false)
    const [textupdate, setTextUpdate] = useState(null)
    const usersData = useSelector((state) => state.usersReducer)
    const dispatch = useDispatch()
    const userId = getLocal('userId')

    const updateItem = () => {
        if (textupdate) {
            dispatch(updatePost(post._id, textupdate))
        }
        setIsUpdate(false)
    }

    useEffect(() => {
        if (!isEmpty(usersData)) {
            setIsLoading(false);
        }
    }, [usersData]);

    return (
        <li className="card-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        {usersData.map((user) => {
                            if (user._id === post.posterId) {
                                return <img key={user._id} src={user.picture} alt="poster-pic" />
                            }
                            return null;
                        })}

                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                {usersData.map((user) => {
                                    if (user._id === post.posterId) {
                                        return <h3 key={user._id}>{user.pseudo}</h3>;
                                    }
                                    return null;
                                })}
                                {(post.posterId !== userId && userId !== null) && <FollowHandler idToFollow={post.posterId} type={'card'} />}

                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {isUpdate === false && <p>{post.message}</p>}
                        {isUpdate &&
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem}>
                                        valider modification
                                    </button>
                                </div>
                            </div>
                        }
                        {post.picture && <img className="card-pic" src={post.picture} alt="Card pic" />}
                        {post.video && <iframe
                            width="560"
                            height="315"
                            src={post.video}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        >
                        </iframe>}
                        {userId === post.posterId &&
                            <div className="button-container">
                                <div onClick={() => setIsUpdate(!isUpdate)}>
                                    <img src="./img/icons/edit.svg" alt="edit" />
                                </div>
                            </div>
                        }
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src="./img/icons/message1.svg" alt="comment" />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                    </div>
                </>
            )}
        </li>
    );
}
