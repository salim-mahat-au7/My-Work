const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

//Models
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')

//Email
const sendEmail = require('../utils/nodemailer')

//Config
const keys = require('../config/keys')

//Validation
const validateUserLoginInput = require('../validation/userLogin')
const validateUserRegisterInput = require('../validation/userRegister')
const validateUploadPost = require('../validation/uploadPost')
const validateOTP = require('../validation/otpValidation')
const validateForgotPassword = require('../validation/forgotPassword')
const validateUserUpdatePassword = require('../validation/updatePassword')




module.exports = {
    userRegister: async (req, res, next) => {
        try {
            const { errors, isValid } = validateUserRegisterInput(req.body)
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { name, email, password } = req.body;
            const user = await User.findOne({ email })
            if (user) {
                errors.email = "Email already exist"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 10)
            const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
            const newUser = await new User({
                name,
                email,
                password: hashedPassword,
                avatar
            })
            await newUser.save()
            res.status(200).json({ message: newUser})
        }
        catch (err) {
            console.log("Error in userRegister", err.message)
            return res.status(400).json({message:`Error in userRegister ${err.message}`})
        }
    },
    userLogin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateUserLoginInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { email, password } = req.body;
            const user = await (await User.findOne({ email })).populate('posts')
            if (!user) {
                errors.email = "Email doesnt not exist"
                return res.status(400).json(errors) 
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const payload = { id: user.id, user: user }
            jwt.sign(
                payload,
                keys.secretKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );

        }
        catch (err) {
            console.log("Error in userLogin", err.message)
            return res.status(400).json({ message: `Error in userLogin ${err.message}` })
        }
    },
    uploadPost: async (req, res, next) => {
        try {
            // const { errors, isValid } = validateUploadPost(req.body)
            // if (!isValid) {
            //     console.log("errors",errors)
            //     return res.status(400).json(errors)
            // }
        
            const { name } = req.user
            const { title, description, email } = req.body;
            const imgUrl = await bufferConversion(req.file.originalname, req.file.buffer)
            const imgResponse = await cloudinary.uploader.upload(imgUrl)
            const user = await User.findOne({ email })
            const newPost = await new Post({
                title,
                description,
                imgUrl: imgResponse.secure_url,
                author: name,
                user: user._id
            })
            await newPost.save()
            user.posts.push(newPost._id)
            await user.save()
            return res.status(200).json({message: newPost})
        }
        catch (err) {
            console.log("Error in uploadPost", err.message)
            return res.status(400).json({ message: `Error in uploadPost ${err.message}` })
        }
    },
    deletePost: async (req, res, next) => {
        try {
            const {_id} = req.user
            const { postId } = req.params 
            const user = await User.findById(_id)
            const { posts}  = user
            const postIndex = posts.findIndex((postItem) => {
                return postItem.toString() == postId.toString()
            })
            if (postIndex === -1)
                return res.status(400).json({ message: "Invalid request" })
            posts.splice(postIndex, 1)
            await user.save();
            await Post.findOneAndDelete({ _id: postId })
            await Comment.deleteMany({ post: postId })
            const allPosts = await Post.find({ user: _id }).populate('comments').populate('likes')
            res.status(200).json({message: allPosts})
        }
        catch (err) {
            console.log("Error in deletePost", err.message)
            return res.status(400).json({ message: `Error in deletePost ${err.message}` })
        }
    },
    commentOnSomeonePost: async (req, res, next) => {
        try {
            const {postId} = req.params
            const {comment } = req.body;
            const { name, _id } = req.user
            const newComment = await new Comment({
                comment,
                author:name,
                commentedBy: _id,
            })
            newComment.post = postId
            await newComment.save()
            const post = await Post.findById({ _id: postId })
            post.comments.push(newComment._id)
            await post.save()
            const allPosts = await Post.find({}).populate('comments').populate('likes')
            return res.status(200).json({message:allPosts})
        }
        catch (err) {
            console.log("Error in commentOnSomeonePost", err.message)
            return res.status(400).json({ message: `Error in commentOnSomeonePost ${err.message}` })
        }
    },
    likeSomeonePost: async (req, res, next) => {
        try {
            const {_id} = req.user
            const { postId } = req.params
            const post = await Post.findOne({ _id: postId })
            const likesList = post.likes
            const userIndex = likesList.findIndex((userIds) => {
                return userIds.toString() === _id.toString()
            })
            if (userIndex === -1) {
                post.likes.push(_id)
                await post.save()
            }
            else {
                post.likes.splice(userIndex, 1)
                await post.save()
            }
            const allPosts = await Post.find({}).populate('comments').populate('likes')
            return res.status(200).json({message:allPosts})
        }
        catch (err) {
            console.log("Error in likeSomeonePost", err.message)
            return res.status(400).json({ message: `Error in likeSomeonePost ${err.message}` })
        }
    },
    getAllPost: async (req, res, next) => {
        try {
            const allPosts = await Post.find({}).populate('comments').populate('likes')
            if (allPosts.length === 0) {
                return res.status(200).json({message: allPosts})
            }
            return res.status(200).json({ message: allPosts})

        }
        catch (err) {
            console.log("Error in getAllPost", err.message)
            return res.status(400).json({ message: `Error in getAllPost ${err.message}` })
        }
    },
    getUsersPost: async (req, res, next) => {
        try {
            const { userId } = req.params
            const allPosts = await Post.find({ user: userId })
            if (allPosts.length === 0) {
                return res.status(200).json({ message: allPosts })
            }
            return res.status(200).json({ message: allPosts })

        }
        catch (err) {
            console.log("Error in getAllPost", err.message)
            return res.status(400).json({ message: `Error in getAllPost ${err.message}` })
        }
    },
    getPostDetailsByPostId: async (req, res, next) => {
        try {
            const { postId } = req.params
            const post = await Post.findOne({ _id: postId }).populate('comments').populate('likes')
            return res.status(200).json({message:post})
        }
        catch (err) {
            console.log("Error in getPostDetailsByPostId", err.message)
            return res.status(400).json({ message: `Error in getPostDetailsByPostId${err.message}` })
            
        }
    },
    deleteComment: async (req, res, next) => {
        try {
            const { postId, commentId } = req.params
            const post = await Post.findOne({ _id: postId }).populate('comments').populate('likes')
            const allComments = post.comments
            const commentIndex = allComments.findIndex((comment) => {
                return comment._id.toString() === commentId.toString()
            })
            if (commentIndex === -1)
            {
                console.log("hey")
                return res.status(404).json({ message: "Invalid Request" })
                }
                
            await allComments.splice(commentIndex, 1)
            await post.save()
            await Comment.findByIdAndDelete({ _id: commentId })
            return res.status(200).json({ message: post })
        }
        catch (err) {
            console.log("Error in getPostDetailsByPostId", err.message)
            return res.status(400).json({ message: `Error in getPostDetailsByPostId${err.message}` })

        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateForgotPassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                errors.email = "Email Not found, Provide registered email"
                return res.status(400).json(errors)
            }
            function generateOTP() {
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            }
            const OTP = await generateOTP()
            user.otp = OTP
            await user.save()
            await sendEmail(user.email, OTP, "OTP")
            res.status(200).json({ message: "check your registered email for OTP" })
            const helper = async () => {
                user.otp = ""
                await user.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            console.log("Error in sending email", err.message)
            return res.status(400).json({ message: `Error in generateOTP${err.message}` })
        }
    },
    postOTP: async (req, res, next) => {
        try {
            const { errors, isValid } = validateOTP(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, otp, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(400).json(errors);
            }
            const user = await User.findOne({ email });

            if (user.otp === "") {
                errors.otp = "OTP has expired"
                return res.status(400).json(errors)
            }
            if (user.otp !== otp) {

                errors.otp = "Invalid OTP, check your email again"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword;
            await user.save()
            return res.status(200).json({ message: "Password Changed" })
        }
        catch (err) {
            console.log("Error in submitting otp", err.message)
            return res.status(400).json({ message: `Error in postOTP${err.message}` })
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateUserUpdatePassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, oldPassword, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(404).json(errors);
            }
            const user = await User.findOne({ email })
            const isCorrect = await bcrypt.compare(oldPassword, user.password)
            if (!isCorrect) {
                errors.oldPassword = 'Invalid old Password';
                return res.status(404).json(errors);
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword;
            await user.save()
            res.status(200).json({ message: "Password Updated" })
        }
        catch (err) {
            console.log("Error in updating password", err.message)
            return res.status(400).json({ message: `Error in updatePassword${err.message}` })
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const user = await User.find({})
            if (!user)
                res.status(400).json({ message: "No any user have registerd yet" })
            return res.status(200).json({ message: user })
        }
        catch (err) {
            console.log("Error in getAllUsers", err.message)
            res.status(500).json({ message: `Error in getAllUsers${err.message}`  })
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params
            const user = await User.findOne({_id:userId}).populate('posts')
            if (!user)
                res.status(400).json({ message: "No any user have registerd yet" })
            return res.status(200).json({ message: user })
        }
        catch (err) {
            console.log("Error in getuserById", err.message)
            res.status(500).json({ message: `Error in  getuserById${err.message}` })
        }
    }
}


