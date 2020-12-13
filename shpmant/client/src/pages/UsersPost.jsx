import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUsersPost } from '../redux/actions/userAction'
import Navbar from '../components/Navbar'
import PersonalCard from '../components/PersonalCard'

const UsersPost = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const store = useSelector(store => store.userRoot)

    useEffect(() => {
        dispatch(getUsersPost(props.match.params.userId))
    }, [])
   
    return (
        <>
            {store.isAuthenticated ? <>
                <Navbar />
                 {store.usersPost.map(post =>
                    <PersonalCard _id={post._id} author={post.author} comments={post.comments} likes={post.likes} imgUrl={post.imgUrl} title={post.title} description={post.description} />
                )}
            </> : history.push('/')}
        </>


    )
}

export default UsersPost
