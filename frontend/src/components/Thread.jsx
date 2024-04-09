import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../actions/post.actions"
import { isEmpty } from "../utils/Utils"
import Card from "./Card"

export default function Thread() {
    const [loadPost, setLoadPost] = useState(true)
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.postReducer)

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts())
            setLoadPost(false)
        }
    }, [loadPost])

    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card key={post._id} post={post} />
                    })
                }
            </ul>
        </div>
    )
}