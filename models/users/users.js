const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,//not really a vlaidation, it will create a unique index in our dbs
    },
    hash: {
        type: String,
        required: true
    },

    credits: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        required: true
    },
})

//this creates the user collections
const User = mongoose.model('User', userSchema)

module.exports = User
