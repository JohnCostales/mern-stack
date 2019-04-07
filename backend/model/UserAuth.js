const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
})

// export to UserSchema to users
module.exports = User = mongoose.model('users', UserSchema)