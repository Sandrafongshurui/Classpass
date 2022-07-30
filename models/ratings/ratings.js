const mongoose = require('mongoose')

const productRatingSchema = new mongoose.Schema({
    user_id: {
        type: String,//another way is to use a ref, with .populate 
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

//save a collection called Product Ratings
const ProductRating = mongoose.model('ProductRatings', productRatingSchema)

module.exports = ProductRating
