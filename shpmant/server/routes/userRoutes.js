const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../utils/multer')   



const { userRegister, userLogin, uploadPost, getAllPost,
    deletePost, commentOnSomeonePost, likeSomeonePost,
    getUsersPost, getPostDetailsByPostId, deleteComment,
    forgotPassword, postOTP, updatePassword, getAllUsers,
   getUserById
} = require('../controllers/userController')


router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

router.get('/getUserById/:userId', passport.authenticate('jwt', { session: false }), getUserById)

router.get('/getAllUsers', passport.authenticate('jwt', { session: false }), getAllUsers)

router.post('/uploadPost', passport.authenticate('jwt', { session: false }), upload.single("imgUrl"), uploadPost)

router.get('/getAllPost', passport.authenticate('jwt', { session: false }), getAllPost)

router.get('/usersPost/:userId', passport.authenticate('jwt', { session: false }), getUsersPost)

router.delete('/deletePost/:postId', passport.authenticate('jwt', { session: false }), deletePost)

router.delete('/deleteComment/:postId/:commentId', passport.authenticate('jwt', { session: false }), deleteComment)

router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword)

router.post('/commentPost/:postId', passport.authenticate('jwt', { session: false }), commentOnSomeonePost)

router.get('/likePost/:postId', passport.authenticate('jwt', { session: false }), likeSomeonePost)

router.get('/postDetails/:postId', passport.authenticate('jwt', { session: false }), getPostDetailsByPostId)



module.exports = router