import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar'

const UserDetails = () => {
    const store = useSelector(store=>store.userRoot)
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
                                    <img className="card-img-top" src={store.user.avatar} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{store.user.name}</h5>
                                        <Link to='/user/updatePassword'>UPDATE PASSWORD</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-7 bg-dark text-white">
                                <table class="table">
                                    <tbody class="text-white">
                                        <tr>
                                            <td>Name</td>
                                            <td>{store.user.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{store.user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Post</td>
                                            <td>{store.usersPost.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">

                    </div>
                </div>
            </div>

        </>
        
    )
}

export default UserDetails
