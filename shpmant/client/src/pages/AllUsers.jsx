import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {getAllUsers} from '../redux/actions/userAction'
import Navbar from '../components/Navbar'

const AllUsers = () => {
    const store = useSelector(store => store.userRoot)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    return (
        <>
            <Navbar/>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 m-auto">
                        { store.allUsers.map(data=>
                        <div class="jumbotron mt-2 p-3">
                                <h1 class="display-4">{data.name}</h1>
                                <Link class="btn btn-primary btn-lg" to={`/usersPost/${data._id}`}  >All Post {data.posts.length}</Link>
                        </div>
                        )}
                        
                    </div>
                </div>
            </div>
            </>
           
            
           
            
            
        
    )
}

export default AllUsers
