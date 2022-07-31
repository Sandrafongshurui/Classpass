const lessonModel = require("../../models/lessons/lessons");

const controller = {
  createLesson: async (req, res) => {
    // create the user and store in db
    //using mongoose lib auto creat and store in dbs
    try {
      await lessonModel.create({
        name: req.body.name,
        credits: req.body.credits,
        instructor: req.body.instructor, //put in the hash, not the plan text pass word
        capacity: req.body.capacity,
        time: req.body.time,
        duration: req.body.duration,
        date: req.body.date,
        details: req.body.details,
        studio: req.body.studio,
        reviews: req.body.reviews,
        students: req.body.students,
        createdBy: req.body.createdBy,
        dateCreated: req.body.dateCreated
      });
    } catch (err) {
      console.log(err);
      res.send("failed to create lesson");
      return;
    }
    res.send("lesson created");
  },

//   showListOfStudios: async (req, res) => {
//     const studios = await studioModel.find({});
//     console.log(studios);
//     res.render("studios/index", { studios });
//   },

//   //the  studio_id would be in the index(showing list of studios, in the ahref link)
//   //"/studios/studio_id"
//   getStudio: async (req, res) => {
//     const studio = await studioModel.findById(req.params.studio_id);
//     console.log(studio);
//     console.log(studio.address);
//     //const ratings = await productRatingModel.find({product_id: req.params.product_id})

//     // todo: aggregation of ratings

//     res.render("studios/show", {
//       studio,
//     });
//   },
};

module.exports = controller;
