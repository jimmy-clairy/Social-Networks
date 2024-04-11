import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/post.actions'

export default function DeleteCard({ id }) {
    const dispatch = useDispatch()

    const deleteCard = () => {
        dispatch(deletePost(id))
    }

    return (
        <div onClick={
            () => {
                if (window.confirm('Voulez-vous supprimez cet article ?')) { deleteCard() }
            }}
        >
            <img src="./img/icons/trash.svg" alt="Trash" />
        </div>
    )
}