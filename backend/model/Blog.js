const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const BlogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    link: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    preview: {
        type: String,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                degfault: Date.now
            }
        }
    ],
    date: {
        type: Date,
        degfault: Date.now
    }
})

module.exports = Blogs = mongoose.model('blog', BlogSchema)