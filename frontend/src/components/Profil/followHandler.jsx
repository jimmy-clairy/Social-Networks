import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "../../utils/Utils";
import { followUser, unfollowUser } from "../../actions/user.actions";

export default function followHandler({ idToFollow }) {
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const [isFollowed, setIsFollowed] = useState(false)

    const handleFollow = () => {
        dispatch(followUser(idToFollow))
        setIsFollowed(true)
    }
    const handleUnfollow = () => {
        dispatch(unfollowUser(idToFollow))
        setIsFollowed(false)
    }

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true)
            } else {
                setIsFollowed(false)
            }
        }
    }, [userData, idToFollow])

    return (
        <>
            {isFollowed ?
                <button
                    className="unfollow-btn"
                    onClick={handleUnfollow}>
                    Unfollow
                </button>
                :
                <button
                    className="follow-btn"
                    onClick={handleFollow}>
                    Follow
                </button>
            }
        </>
    )
}