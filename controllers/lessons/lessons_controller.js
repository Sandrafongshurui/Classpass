const { date } = require("joi");
const lessonModel = require("../../models/lessons/lessons");
const studioModel = require("../../models/studios/studios");
const { dates } = require("../../utils/helper");

const storeSelection = {
  filter: "All Classes",
};

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

  getLessons: async (req, res, next) => {
    let selectedDate = new Date();
    let todaysDate = new Date();
    let filterOptions = "All Classes";
    let lessons = [];
    let oneWeekLaterDate = dates.getOneWeekLater(todaysDate).toDateString()
    console.log(oneWeekLaterDate)
    //check if user selected a lesson type, it is submited by a form
    //if no body, means user went next date(page refresh), so we want to retain his previous filter
    if (req.body.options) {
      filterOptions = req.body.options;
      storeSelection.filter = req.body.options;
    } else {
      filterOptions = storeSelection.filter;
    }

    //check if date queries is present
    // if (req.query.date) {
    //   selectedDate = req.query.date;
    // }

    const studio = await studioModel
      .findById(req.params.studio_id)
      .lean() //lean makes it a plain js object, so i can add properties, mongoose obj cant edit
      .populate({
        path: "lessons",
      });

    //get lessons on the selected date, canot match in .populate cos iso timing is always diff
    let matchedLessons = [];
    studio.lessons.forEach((item) => {
      if (req.query.date) {
        //back to today
         selectedDate = req.query.date;
        if (item.lessonDate.toDateString() == dates.getDateFromDateString(selectedDate)) {
          matchedLessons.push(item);
        }
      } else {
        //if its todays date is not in datestring format
        if (item.lessonDate.toDateString() === selectedDate.toDateString()) {
          matchedLessons.push(item);
        }
        //if its today
        //check if the timing of teh lesson is over
        let timeNow = new Date().toTimeString();
        //console.log(timeNow)
        timeNow = timeNow.split(":")[0] + ":" + timeNow.split(":")[1];
        //console.log(timeNow)
        matchedLessons = matchedLessons.filter((lesson) => lesson.time > timeNow
        );
      }
    });

    //check for filtered lessons, not the default means user has selected a lesson type
    if (filterOptions !== "All Classes") {
      lessons = matchedLessons.filter(
        (lesson) => lesson.name === filterOptions
      );
    } else {
      lessons = matchedLessons;
    }

    //add new filed to each lesson , check if user_id is inside the lesson.students
    lessons.forEach((lesson) => {
      if (
        lesson.students.some((studentObj) => {return studentObj.equals(req.session.user);
        })
      ) {
        lesson.hasBooked = true;
      } else {
        lesson.hasBooked = false;
      }
    });

    //sort accrouding to timing
    let sortedLessons = lessons.sort((a, b) => {
      //-1 means first go before second, 1 means it goes after, 0 means the same
      return a.time > b.time ? 1 : a.time < b.time ? -1 : 0;
    });

    //add all classes as the first item in lessonNames
    studio.lessonNames.unshift("All Classes");

    res.render("studios/show", {
      oneWeekLaterDate,
      filterOptions,
      studio,
      tab: "lessons",
      lessonNames: studio.lessonNames,
      lessons: sortedLessons,
      todaysDate,
      selectedDate,
      dates,
      // user : req.session.user
    });
  },
};

module.exports = controller;
