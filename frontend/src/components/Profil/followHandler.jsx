import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "../../utils/Utils";
import { followUser, unfollowUser } from "../../actions/user.actions";

export default function FollowHandler({ idToFollow, type }) {
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
        console.log('test');
    }, [userData, idToFollow])

    return (
        <>
            {isFollowed ?
                <span onClick={handleUnfollow}>
                    {type === 'suggestion' && <button className="unfollow-btn"> Unfollow </button>}
                    {type === 'card' && <img src="./img/icons/checked.svg" alt='checked' />}
                </span>
                :
                <span onClick={handleFollow}>
                    {type === 'suggestion' && <button className="follow-btn">Follow</button>}
                    {type === 'card' && <img src="./img/icons/check.svg" alt='check' />}
                </span>
            }
        </>
    )
}