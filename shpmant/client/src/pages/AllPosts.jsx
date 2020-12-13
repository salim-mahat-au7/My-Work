import React, {useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAllPost} from '../redux/actions/userAction'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

const AllPosts = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const store = useSelector(store => store.userRoot)

    useEffect(() => {
        dispatch(getAllPost())
    }, [])

    return (
        <>
            {store.isAuthenticated ? <>
                <Navbar />
                {store.allPosts.map(post =>
                    <Card userId={post.user} _id={post._id} comments={post.comments} author = {post.author} likes={post.likes} imgUrl = {post.imgUrl} title={post.title} description={post.description} />
                    )}
            </> : history.push('/')}
        </>
        
    
    )
}

export default AllPosts
