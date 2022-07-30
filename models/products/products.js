const mongoose = require('mongoose')

//user post man to post back this manner to make sure its working befor using the form
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})

//this creates the product collections
const Product = mongoose.model('Product', productSchema)

module.exports = Product
