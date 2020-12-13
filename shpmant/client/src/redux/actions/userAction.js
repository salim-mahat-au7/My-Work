import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import jwt_decode from 'jwt-decode'


export const userLoginHelper = (data) => {
    return {
        type: "SET_USERS_DATA",
        payload: data
    }
}

const userLogoutHelper = (data) => {
    return {
        type: "DELETE_USERS_DATA",
        payload: data
    }
}

const getAllPostHelper = (data) => {
    return {
        type: "ALL_POSTS",
        payload: data
    }
}

const usersPostHelper = (data) => {
    return {
        type: "USERS_POST",
        payload: data
    }
}


const postDetailsByPostIdHelper = (data) => {
    return {
        type: "SINGLE_POST_DETAILS",
        payload: data
    }
}

const registerLoaderFlagHelper = (data) => {
    return {
        type: "SET_REGISTER_LOADER",
        payload: data
    }
}

const postUploadLoaderFlagHelper = (data) => {
    return {
        type: "SET_POST_UPLOAD_LOADER",
        payload: data
    }
}

export const userRegister = (userRegisterCredentials,history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Post",
                url: " http://localhost:5000/api/user/register",
                data: userRegisterCredentials
            })
            dispatch(registerLoaderFlagHelper(true))
            history.push('/')
        }
        catch (err) {
            dispatch({
                type:"SET_REGISTER_ERRORS",
                payload: err.response.data
            })
            console.log("Error in userRegister Action", err.message)
        }
       
    }
}

export const userLogin = (userLoginCredentials,history) => {
    return async (dispatch) => {
        try {
        
            const { data } = await axios({
                method: "Post",
                url: " http://localhost:5000/api/user/login",
                data: userLoginCredentials
            })
            
            const { token } = data
            localStorage.setItem('userJwtToken', token);
            
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(userLoginHelper(decoded.user))
            history.push('/allposts')
        }
        catch (err) {
            dispatch({
                type: "SET_LOGIN_ERRORS",
                payload: err.response.data
            })
            console.log("Error in userLogin Action", err.message)
        }

    }
}

export const userUploadPost = (userPostCredential, history,userId) => {
    return async (dispatch) => {
        try {
            dispatch(postUploadLoaderFlagHelper(true))
            const { data } = await axios({
                method: "Post",
                url: " http://localhost:5000/api/user/uploadPost",
                data: userPostCredential
            })
            history.push(`/usersPost/${userId}`)
        }
        catch (err) {
            dispatch({
                type: "SET_UPLOAD_POST_ERRORS",
                payload: err.response.data
            })
            console.log("Error in userUploadPost", err.message)
        }
    }
}

export const getAllPost = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: " http://localhost:5000/api/user/getAllPost"
            })
            dispatch(getAllPostHelper(data.message))
        }
        catch (err) {
            console.log("Error in getting all Post", err.message)
        }
    }
}

export const getUsersPost = (userId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: ` http://localhost:5000/api/user/usersPost/${userId}`
            })
            dispatch(usersPostHelper(data.message))
        }
        catch (err) {
            console.log("Error in getting all Post", err.message)
        }
    }
}

export const deleteUsersPost = (postId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Delete",
                url: ` http://localhost:5000/api/user/deletePost/${postId}`
            })
           dispatch(usersPostHelper(data.message))
        }
        catch (err) {
            console.log("Error in getting all Post", err.message)
        }
    }
}

export const likeUsersPost = (postId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: ` http://localhost:5000/api/user/likePost/${postId}`
            })
            dispatch(getAllPostHelper(data.message))
        }
        catch (err) {
            console.log("Error in getting all Post", err.message)
        }
    }
}

export const commentOnUsersPost = (postId, comment) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Post",
                url: ` http://localhost:5000/api/user/commentPost/${postId}`,
                data: comment
            })
            dispatch(getAllPostHelper(data.message))
        }
        catch (err) {
            console.log("Error in getting all Post", err.message)
        }
    }
}

export const postDetailsByPostId  = (postId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: ` http://localhost:5000/api/user/postDetails/${postId}`
            })
            dispatch(postDetailsByPostIdHelper(data.message))
        }
        catch (err) {
            console.log("Error in getting all Post", err.message)
        }
    }
}

export const deleteComment = (postId, commentId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Delete",
                url: ` http://localhost:5000/api/user/deleteComment/${postId}/${commentId}`
            })
            dispatch(postDetailsByPostIdHelper(data.message))
        }
        catch (err) {
            console.log("Error in getting all Post", err.message)
        }
    }
}

export const getOTP = (userEmail) => {
    return async (dispatch) => {
        try {
            await axios({
                method: 'Post',
                url: ' http://localhost:5000/api/user/forgotPassword',
                data: userEmail
            })
            alert("Otp has been sent to your email")
            dispatch({
                type: "SET_FORGOT_PASSWORD_HELPER_FLAG",
                payload: true
            })
           
        }
        catch (err) {
            dispatch({
                type: "SET_FORGOT_PASSWORD_ERRORS",
                payload: err.response.data
            })
            console.log("Error in getOTPUser", err.message)
        }
    }
}

export const submitOTP = (newPasswordWithOtp, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: " http://localhost:5000/api/user/postOTP",
                data: newPasswordWithOtp
            })
            alert("Password Update, kindly login with updated password")
            history.push('/')
        }
        catch (err) {
            dispatch({
                type: "SET_FORGOT_PASSWORD_ERRORS",
                payload: err.response.data
            })
            console.log("Error in submitOTP", err.message)
        }
    }
}

export const updatePassword = (passwordData,history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: " http://localhost:5000/api/user/updatePassword",
                data: passwordData
            })
            alert("Password Updated Successfully")
            history.push('/profile')
        }
        catch (err) {
            dispatch({
                type: "SET_UPDATE_PASSWORD_ERROR",
                payload: err.response.data
            })
        }
    }
}

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: " http://localhost:5000/api/user/getAllUsers",
                
            })
            dispatch({
                type: "SET_ALL_USERS",
                payload: data.message
            })
        }
        catch (err) {
            dispatch({
                type: "SET_UPDATE_PASSWORD_ERROR",
                payload: err.response.data
            })
        }
    }
}

export const getUserById = (userId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: ` http://localhost:5000/api/user/getUserById/${userId}`
            })
            dispatch({
                type: "SET_SINGLE_USER",
                payload: data.message
            })
        }
        catch (err) {
           console.log("Error in getUserById action", err.message)
        }
    }
}


export const userLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('userJwtToken');
        setAuthToken(false);
        dispatch(userLogoutHelper({}));
    }
}