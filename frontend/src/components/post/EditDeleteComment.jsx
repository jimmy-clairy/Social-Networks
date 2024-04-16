import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteComment, editComment } from "../../actions/post.actions"

export default function EditDeleteComment({ comment, postId }) {
    const [isAuthor, setIsAuthor] = useState(false)
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState('')

    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const handleEdit = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(editComment(postId, comment._id, text))
            setText('')
            setEdit(false)
        }
    }
    const handleDelete = () => {
        dispatch(deleteComment(postId, comment._id))
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (userData._id === comment.commenterId) {
                setIsAuthor(true)
            }
        }
        checkAuthor()
    }, [userData._id, comment.commenterId])

    return (
        <div className="edit-comment">
            {(isAuthor && edit === false) && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="edit-comment" />
                </span>
            )}
            {(isAuthor && edit) && (
                <form action="" onSubmit={handleEdit} className="edit-comment-form">
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>
                    <br />
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                    <br />
                    <div className="btn">
                        <span onClick={() => {
                            if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                                handleDelete()
                            }
                        }}>
                            <img src="./img/icons/trash.svg" alt="delete" />
                        </span>
                        <input type="submit" value="Valider les modifications" />
                    </div>
                </form>
            )}
        </div>
    )
}