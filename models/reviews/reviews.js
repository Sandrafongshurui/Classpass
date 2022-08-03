const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,//pass the now() into this , passin g the returnred value, date .now() would captured a valuew when the schema is created
        required: true
    }


})

//save a collection called Product Ratings
const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
