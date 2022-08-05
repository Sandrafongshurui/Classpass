const { date } = require("joi");
const lessonModel = require("../../models/lessons/lessons");
const studioModel = require("../../models/studios/studios");
const dates = require( "../../utils/helper");

const controller = {
  createLesson: async (req, res) => {
    // create the user and store in db
    //using mongoose lib auto creat and store in dbs
    let newLessonId = null;
    try {
      const newLesson = await lessonModel.create({
        name: req.body.name,
        credits: req.body.credits,
        instructor: req.body.instructor,
        capacity: req.body.capacity,
        time: req.body.time,
        duration: req.body.duration,
        dateOfLesson: req.body.dateOfLesson,
        details: req.body.details,
        studio: req.body.studio,
        reviews: req.body.reviews,
        students: req.body.students,
        createdBy: req.body.createdBy,
        dateCreated: req.body.dateCreated,
      });
      newLessonId = newLesson._id;
    } catch (err) {
      console.log(err);
      res.send("failed to create lesson");
      return;
    }
    //update studios with this lesson
    try {
      console.log(req.body.studio);
      console.log(newLessonId);
      const doc = await studioModel.findOneAndUpdate(
        { name: req.body.studio },
        { $push: { lessons: newLessonId } },
        { new: true } //new means it will return teh update doc, if not it will return doc b4 updates
      );
      console.log(doc.lessons);
    } catch (err) {
      console.log(err);
      res.send("failed to add to studio");
      return;
    }

    res.send("lesson created");
  },

  getLessons: async (req, res) => {
    //check if date queries is present
    let selectedDate = dates.getTodaysDate()
    let todaysDate = dates.getTodaysDate()
    if(req.query.date){
      selectedDate  = req.query.date
    }
    
    //const selectedDate = dates.displayDate
    const studio = await studioModel.findById(req.params.studio_id).populate({
      path: "lessons",
      match: { dateOfLesson: selectedDate },
    });

    res.render("studios/show", {
      studio,
      tab: "lessons",
      numOfLessonNames: studio.lessonNames.length,
      lessonNames: studio.lessonNames,
      lessons: studio.lessons,
      todaysDate,
      selectedDate,
      dates,
      user : "62e5fbc02fadae2aaa65e636"
    });
  },
};

module.exports = controller;
