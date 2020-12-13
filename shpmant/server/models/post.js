const mongoose = require('mongoose')
const { Schema } = mongoose


const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        max:140,
        min: 1
    },
    imgUrl: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]

})


module.exports = mongoose.model('post', postSchema)
