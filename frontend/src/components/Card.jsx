import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../utils/Utils";
import FollowHandler from "./profil/FollowHandler";
import LikeButton from "./post/LikeButton";
import { getLocal } from "../utils/localStorage";

export default function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true)
    const usersData = useSelector((state) => state.usersReducer)
    const userId = getLocal('userId')

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
                        <p>{post.message}</p>
                        {post.picture && <img className="card-pic" src={post.picture} alt="Card pic" />}
                        {post.video && <iframe
                            width="560"
                            height="315"
                            src={post.video}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        >
                        </iframe>}
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
