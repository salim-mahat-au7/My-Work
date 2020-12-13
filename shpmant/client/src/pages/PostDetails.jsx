import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postDetailsByPostId, deleteComment } from '../redux/actions/userAction'
import Navbar from '../components/Navbar'
import Button from '../components/Button'

const PostDetails = (props) => {
    const store = useSelector(store => store.userRoot)
    const dispatch = useDispatch()
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(postDetailsByPostId(props.match.params.postId))
    }, [])

    useEffect(() => {
        if (store.singlePost.likes && store.singlePost.comments) {
            setIsLoading(false)
            setLikes(store.singlePost.likes)
            setComments(store.singlePost.comments)
        }
    }, [store.singlePost.likes, store.singlePost.comments])

    const clickHandler = (postId, commentId) => {
        dispatch(deleteComment(postId, commentId))
    }

    return (
        <>
            <Navbar />
            <div class="container">
                <div class="row mt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-1">
                            {
                                isLoading && <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card ml-5 my-3" style={{ width: "18rem", display: "inline-block" }}>
                            <img src={store.singlePost.imgUrl} style={{ width: "100%", height: "360px" }} class="card-img-top" alt="userpost" />
                            <div class="card-body">
                                <h5 class="card-title">{store.singlePost.author}</h5>
                                <h5 class="card-title">{store.singlePost.title}</h5>
                                <p class="card-text">{store.singlePost.description}.</p>
                                <h5>Likes: {likes.length}</h5>
                                <h5>Comments: {comments.length}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="row mt-3">
                            <div class="col-sm-6 border">
                                <h1>Likes</h1>
                                {likes.map((obj) =>
                                    <p><strong>{obj.name}</strong> liked this post.</p>
                                )}
                            </div>
                            <div class="col-sm-6 border">
                                <h1>Comments</h1>
                                {comments.map((obj) =>
                                    <>
                                        <p><strong>{obj.author}</strong>: {obj.comment} </p>
                                        {store.user._id === obj.commentedBy ?
                                            <button className="btn btn-danger mb-3" onClick={() => clickHandler(store.singlePost._id, obj._id)}>Delete</button>
                                            // <Button postId={store.singlePost._id} commentId={obj._id} /> 
                                            : null}
                                        </>
                                )}
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    )
}

export default PostDetails
