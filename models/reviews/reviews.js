const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    class_id: {
        type: String,
        required: true
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
