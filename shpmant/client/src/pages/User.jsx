import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {getUserById, getAllPost} from '../redux/actions/userAction'
import Navbar from '../components/Navbar'
import Card from '../components/Card'


const User = (props) => {
    const dispatch = useDispatch()
    const store = useSelector(store => store.userRoot)
    const [posts,setPosts] = useState([])
    useEffect(() => {
        dispatch(getAllPost())
        dispatch(getUserById(props.match.params.userId))
    },[])
    useEffect(() => {
        if (store.singleUser) {
            const post = store.allPosts.filter(obj => {
                return obj.user === store.singleUser._id
            })
            setPosts(post)
        }
    }, [store.singleUser,store.allPosts])

    return (
        <>
            <Navbar />
            <div class="container">
                <div class="row">
                    <div class="col-md-2">

                    </div>
                    <div class="col-md-8 mt-5">
                        <div class="row">
                            <div class="col-md-5">
                                <div className="card" style={{ width: "18rem" }}>
                                    <img className="card-img-top" src={store.singleUser.avatar} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{store.singleUser.name}</h5>
                                        <Link to='#'>CHAT</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-7 bg-dark text-white">
                                <table class="table">
                                    <tbody class="text-white">
                                        <tr>
                                            <td>Name</td>
                                            <td>{store.singleUser.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{store.singleUser.email}</td>
                                        </tr>
                                        <tr>
                                            <td><Link to="#"> Total Post</Link></td>
                                            <td>{posts.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">

                    </div>
                </div>
                <div class="row">
                    {posts.map(post =>
                        <Card userId={post.user} _id={post._id} comments={post.comments} author={post.author} likes={post.likes} imgUrl={post.imgUrl} title={post.title} description={post.description} />
                    )}
                </div>
            </div>

        </>

    )
}

export default User
