import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {deleteUsersPost} from '../redux/actions/userAction'


const PersonalCard = (props) => {
    const store = useSelector(store=>store.userRoot)
    const history = useHistory()
    const dispatch = useDispatch()
    const deleteClickHandler = () => {
        dispatch(deleteUsersPost(props._id))
    }



    return (
        <div class="card ml-5 my-5" style={{ width: "18rem", display: "inline-block" }}>
            <img src={props.imgUrl} style={{ width: "100%", height: "360px" }} class="card-img-top" alt="userPost" />
            <div class="card-body">
                <h5 class="card-title">{props.author}</h5>
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.description}.</p>
                <Link to={`/postDetails/${props._id}`}>Likes {props.likes.length}</Link>
                <Link to={`/postDetails/${props._id}`} className="ml-5">Comments {props.comments.length}</Link>
                {store.user.name === props.author && <div className="mt-3">
                    <button className="btn btn-info">Edit</button>
                    <button onClick={deleteClickHandler} className="btn btn-info ml-5">Delete</button>
                </div> }
               
            </div>
        </div>
    )
}

export default React.memo(PersonalCard)
