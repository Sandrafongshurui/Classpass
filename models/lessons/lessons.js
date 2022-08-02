const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    credits:{
        type: Number,
        required: true
    },
    instructor: {
        type: String,//another way is to use a ref, with .populate 
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    dateOfLesson:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    studio: {
        type: String,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,//this would be the array of the students dbs
        ref: 'Review'///the name it saved in the dbs
    }],
  
    students: [{
        type: Schema.Types.ObjectId,//this would be the array of the students dbs
        ref: 'User'///the name it saved in the dbs
    }],
    createdBy: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    }
})

//save a collection called Product Ratings
const Lesson = mongoose.model('Lesson', lessonsSchema)

module.exports = Lesson