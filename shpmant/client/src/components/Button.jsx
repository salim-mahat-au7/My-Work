import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteComment} from '../redux/actions/userAction'

const Button = (props) => {
    const dispatch = useDispatch()
    const deleteCommentHandler = () => {
        dispatch(deleteComment(props.postId, props.commentId))
    }
    return (
        <button onClick = {deleteCommentHandler} className="btn btn-danger mb-3">Delete</button>
    )
}

export default React.memo(Button) 
