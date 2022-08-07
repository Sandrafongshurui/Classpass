const { date } = require("joi");
const lessonModel = require("../../models/lessons/lessons");
const studioModel = require("../../models/studios/studios");
const dates = require("../../utils/helper");

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
        lessonDate: req.body.lessonDate,
        details: req.body.details,
        studio: req.body.studio,
        reviews: req.body.reviews,
        students: req.body.students,
        createdBy: req.body.createdBy, //shle be res.session.adminuser
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
      const studio = await studioModel.findOneAndUpdate(
        { name: req.body.studio },
        { $push: { lessons: newLessonId } },
        { new: true } //new means it will return teh update doc, if not it will return doc b4 updates
      );
      console.log(studio.lessons);
    } catch (err) {
      console.log(err);
      res.send("failed to add to studio");
      return;
    }

    res.send("lesson created");
  },

  getLessons: async (req, res) => {
    //check if date queries is present
    //let selectedDate = dates.getTodaysDate()
    let selectedDate = new Date();
    let todaysDate = new Date();
    if (req.query.date) {
      selectedDate = req.query.date;
    }

    //lean makes it a plain js object, so i can add properties, mongoose obj cant add
    const studio = await studioModel
      .findById(req.params.studio_id)
      .lean()
      .populate({
        path: "lessons",
        match: { lessonDate: selectedDate },
      });
    //add all classes as the first item in lessonNames
    studio.lessonNames.push("All Classes");
    console.log(studio.lessonNames);
    res.render("studios/show", {
      studio,
      tab: "lessons",
      lessonNames: studio.lessonNames,
      lessons: studio.lessons,
      todaysDate,
      selectedDate,
      dates,
      // user : req.session.user
    });
  },

  //for sandra
  // editDateOfLesson: async (req, res) => {
  //   const doc = await lessonModel.updateMany(
  //     {},
  //     {$set: { lessonDate: '2022-08-20'}},
  //     { upsert: true } //new means it will return teh update doc, if not it will return doc b4 updates
  //   )},

  // addStudents: async (req, res) => {
  //   try{
  //     const doc = await lessonModel.updateMany(
  //       {lessonDate: {$lte : Date.now()}},
  //       {$push: {students: req.params.user_id }},
  //       { new: true } //new means it will return teh update doc, if not it will return doc b4 updates
  //     )
  //     console.log(doc)
  //   }catch(err){
  //     res.send(err)
  //   }

  // }
};

module.exports = controller;
