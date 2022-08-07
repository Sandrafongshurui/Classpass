const studioModel = require("../../models/studios/studios");
const reviewModel = require("../../models/reviews/reviews");

const controller = {
  createStudio: async (req, res) => {
    // create the user and store in db
    //using mongoose lib auto creat and store in dbs
    try {
      await studioModel.create({
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        location: req.body.location,
        address: req.body.address,
        lessonNames: req.body.lessonNames,
        //put in the hash, not the plan text pass word
        // createdBy: req.body.createdBy,
        // reviews: req.body.reviews
      });
    } catch (err) {
      console.log(err);
      res.send("failed to create user");
      return;
    }
    res.send("studio created");
  },

  showListOfStudios: async (req, res) => {
    let studios = null
    try{
      if(!req.query.location){
        studios = await studioModel.find();
         
       }else{
        //user slected location checkboxes, 
        //find if the selected location is inside the array of locations of a studio
        studios = await studioModel.find({location : req.query.location});
       }
       console.log(studios);
    }catch(err){
      console.log(err)
      res.send(err)
      return
    }
    res.render("studios/index", { studios });
  },

  //the  studio_id would be in the index(showing list of studios, in the ahref link)
  //"/studios/studio_id"
  getStudio: async (req, res) => {
    //lean makes it a plain js object, so i can add properties, mongoose obj cant add
    const studio = await studioModel.findById(req.params.studio_id).lean().populate({
      path: "lessons", //poppulate the lessons field
      select: "reviews instructor name", // only get these fields for the lessons
      populate: {
        //populate again for the reviews,
        path: "reviews",
        populate: {
          //populate again for the users, and only get the firstname lastname
          path: "user",
          select: "firstname lastname",
        },
      },
    });

    //filter for lessons with reviews only
    const lessonWithReviews = studio.lessons.filter(
      (eachLesson) => eachLesson.reviews.length !== 0
    );

    //combine all reviews from each lesson
    let totalReviews = [];
    lessonWithReviews.forEach((eachLesson) => {
      eachLesson.reviews.forEach((eachReview) => {
        //add lesson name and  instructor to each review
        eachReview.name = eachLesson.name;
        eachReview.instructor = eachLesson.instructor;
        totalReviews.push(eachReview);
      });
    });

    //sort the dates
    const sortedTotalReviews= totalReviews.sort((a, b) => {
      //-1 means first go before second, 1 means it goes after, 0 means the same
      return (a.dateCreated < b.dateCreated) ? 1 : ((a.dateCreated > b.dateCreated) ? -1 : 0)
    });
    console.log("------>", sortedTotalReviews)

    // todo: aggregation of ratings

    res.render("studios/show", {
      studio,
      sortedTotalReviews, 
      tab: "info",
    });
  },

};

module.exports = controller;
