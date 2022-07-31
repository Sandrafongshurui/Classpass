const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'///the name it saved in the dbs
    },
    lesson_id: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'///the name it saved in the dbs
    },
    studio_id: {
        type: Schema.Types.ObjectId,
        ref: 'Studio'///the name it saved in the dbs
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

//save a collection called Product Ratings
const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
