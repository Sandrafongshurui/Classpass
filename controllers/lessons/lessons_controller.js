const { date } = require("joi");
const lessonModel = require("../../models/lessons/lessons");
const studioModel = require("../../models/studios/studios");

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

  getSelectedDate: (usersSelectedDate) => {},

  getsTodaysDate: () => {
    //get current date
    const dateObj = new date();
    let date = ("0" + dateObj.getDate()).slice(-2); //gets the day today, get the last 2 elements (010 get 10, 05 get 05)
    // current month
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2); //gets the month today (0-11 so must plus 1), get the last 2 elements (010 get 10, 05 get 05)
    // current year
    let year = dateObj.getFullYear(); //get the year in 4 digits
    let todaysDate = `17/${month}/${year}`;
    console.log(todaysDate);
    return todaysDate;
  },

  getLessons: async (req, res) => {
    // const studio = await studioModel
    //   .findById(req.params.studio_id)
    //   .populate("lessons");
    // console.log("----->", studio);

    //check if slected date is todays date
    console.log(this.getsTodaysDate);
    const studio = await studioModel.findById(req.params.studio_id).populate({
      path: "lessons",
      match: { dateOfLesson: "17/08/2022" },
    });
    console.log("----->", studio.lessons);

    res.render("studios/show", {
      studio,
      tab: "lessons",
      numOfLessonNames: studio.lessonNames.length,
      lessonNames: studio.lessonNames,
      lessons: studio.lessons,
    });
  },

  // getSelectedDateLessons: (studio, selectedDate) => {
  //   //get the lessons for todays date
  //   let selectedDateLessons = [];
  //   for (const lesson in studio.lessons) {
  //     if (lesson.dateOfLesson === selectedDate) {
  //       selectedDateLessons.push(lesson);
  //     }
  //   }
  //   return getSelectedDateLessons;
  // },

  // renderLessonsSection: (selectedDate) => {
  //   res.render("partials/lessons", {
  //     selectedDateLessons: this.getSelectedDateLessons(selectedDate),
  //   });
  // },

  //for sandra
  renameField: async (req, res) => {
    await lessonModel.updateMany({}, { $rename: { date: "dateOfLesson" } });
  },
};

module.exports = controller;
