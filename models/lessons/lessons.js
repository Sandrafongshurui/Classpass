const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonsSchema = new mongoose.Schema({
    instructor: {
        type: String,//another way is to use a ref, with .populate 
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,//this would be the array of the students dbs
        ref: 'User'///the name it saved in the dbs
    }],
    studio: {
        type: Schema.Types.ObjectId,//this would be the array of the students dbs
        ref: 'Studio'///the name it saved in the dbs
    },
    dateCreated: {
        type: String,
        required: true
    }
})

//save a collection called Product Ratings
const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Lesson