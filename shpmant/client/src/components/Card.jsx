import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {likeUsersPost,commentOnUsersPost} from '../redux/actions/userAction'

const Card = (props) => {
    const [comment, setComment] = useState("")
    const [showComment, setShowComment] = useState("")
    const dispatch = useDispatch()
    const likeClickHandler = () => {
        dispatch(likeUsersPost(props._id))
    }

    const formHandler = (e)=>
    {
        e.preventDefault()
        dispatch(commentOnUsersPost(props._id, { comment }))
        setShowComment(comment)
        setComment("")
    }


    return (
        <div class="card ml-5 my-3" style={{ width: "18rem", display: "inline-block" }}>
            <img src={props.imgUrl} style={{ width: "100%", height: "360px" }} class="card-img-top" alt="userPost" />
            <div class="card-body">
                <Link to={`/user/${props.userId}`}><h4 class="card-title text-center">{props.author}</h4></Link>
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.description}.</p>
                <button className="btn btn-info" onClick={likeClickHandler}>Likes {props.likes.length}</button>
                <Link className="btn btn-info ml-4" to={`/postDetails/${props._id}`}>Comments {props.comments.length} </Link>
                {showComment && <p><strong>Recent Comment: </strong> {showComment}</p> } 
                <form className="mt-3" onSubmit={formHandler}>
                    <div className="form-group">
                        <textarea onChange={(e) => setComment(e.target.value)} type="text" className="form-control" value={comment}  />
                    </div>
                   <button className="btn btn-primary">Comment</button>
                </form>
            </div>
        </div>
    )
}

export default React.memo(Card)
