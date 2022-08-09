const { date } = require("joi");
const lessonModel = require("../../models/lessons/lessons");
const studioModel = require("../../models/studios/studios");
const {dates}  = require("../../utils/helper");
const {filterLesson}  = require("../../utils/helper");

const storeSelection= {
  filter:""
}

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
    let filterOptions = "All Classes"
    let lessons = []
    

    if(req.body.options){
      filterOptions = req.body.options
      storeSelection.filter = req.body.options
      console.log(filterOptions)
    
    }else{
      
    }

    if (req.query.date) {
      selectedDate = req.query.date;
      
    }

    // const studio = await studioModel
    //   .findById(req.params.studio_id)
    //   .lean() //lean makes it a plain js object, so i can add properties, mongoose obj cant add
    //   .populate({
    //     path: "lessons",
    //     match: { lessonDate: selectedDate},
    //   });
    //get filtered classes first
    const studio = await studioModel
      .findById(req.params.studio_id)
      .lean() //lean makes it a plain js object, so i can add properties, mongoose obj cant add
      .populate({
        path: "lessons",
      });
    const matchedLessons = [];
    studio.lessons.forEach((item) => {
      if (req.query.date) {
        // console.log("today is not selected date");
        // console.log("------->",item.lessonDate.toDateString());
        // console.log("------->",dates.getDateFromDateString(selectedDate));
        //slected date is the query
        if (item.lessonDate.toDateString() == dates.getDateFromDateString(selectedDate)) {
          // console.log("------->",item.lessonDate.toDateString() )
          // console.log("------->",selectedDate)
          console.log("push item into array");
          matchedLessons.push(item);
        }
      } else {
        //if its todays date is not in datestring format
        if (item.lessonDate.toDateString() === selectedDate.toDateString()) {
          matchedLessons.push(item);
         
        }
      }

    });
    
    if(filterOptions !== "All Classes"){
      lessons = matchedLessons.filter(lesson=>  lesson.name === filterOptions )
    }else{
      lessons = matchedLessons
    }
    //console.log(matchedLessons)
    //console.log("----->", studio.lessons);
    //console.log(studio.lessons[0].lessonDate.toDateString());
    //console.log(selectedDate.toDateString());
    //add all classes as the first item in lessonNames
    
    studio.lessonNames.unshift("All Classes");

    res.render("studios/show", {
      filterOptions : storeSelection.filter,
      studio,
      tab: "lessons",
      lessonNames: studio.lessonNames,
      lessons,
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

module.exports = controller
