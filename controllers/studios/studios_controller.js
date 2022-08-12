const studioModel = require("../../models/studios/studios");


const controller = {
  createStudio: async (req, res) => {
    // create the user and store in db
    //using mongoose lib auto creat and store in dbs
    try {
      await studioModel.create({
        ...req.body,
        // name: req.body.name,
        // img: req.body.img,
        // description: req.body.description,
        // location: req.body.location,
        // address: req.body.address,
        lessonNames: req.body.lessonNames,
        activities: req.body.activities,
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

  showListOfStudios: async (req, res, next) => {
    let studios = null;
    try {
      if (Object.keys(req.body).length === 0) {
        console.log("no location query");
        studios = await studioModel.find();

        res.render("studios/index", {
          location: "",
          amenities: "",
          activities: "",
          studios,
        });
        return;
      } else {

        const filterConditions = {};

        Object.entries(req.body).forEach(([key, value]) => {
          filterConditions[key] = {
            [key === "amenities" ? "$all" : "$in"]: value,
          };
        });

        studios = await studioModel.find(filterConditions);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
      return;
    }

    res.render("studios/index", {
      ...req.body,
      studios,
    });

    next();
  },

  //the  studio_id would be in the index(showing list of studios, in the ahref link)
  //"/studios/studio_id"
  getStudio: async (req, res, next) => {
    //lean makes it a plain js object, so i can add properties, mongoose obj cant add
    const studio = await studioModel
      .findById(req.params.studio_id)
      .lean()
      .populate({
        path: "lessons", //poppulate the lessons field
        select: "reviews instructor name details", // only get these fields for the lessons
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
    let lessonWithReviews = [];
    let sortedTotalReviews = [];
    let totalRatings = null;
    let totalReviews = [];
    let avgRating = null;

    lessonWithReviews = studio.lessons.filter(
      (eachLesson) => eachLesson.reviews.length !== 0
    );

    if (lessonWithReviews.length > 0) {
      lessonWithReviews.forEach((eachLesson) => {
        eachLesson.reviews.forEach((eachReview) => {
          //get ratings
          totalRatings += eachReview.rating;
          //add lesson name and  instructor to each review
          eachReview.name = eachLesson.name;
          eachReview.instructor = eachLesson.instructor;
          totalReviews.push(eachReview);
        });
      });
      //get avg ratings
      avgRating = Math.round((totalRatings / totalReviews.length) * 10) / 10;
      console.log(avgRating);
      //sort the dates
      sortedTotalReviews = totalReviews.sort((a, b) => {
        //-1 means first go before second, 1 means it goes after, 0 means the same
        return a.dateCreated < b.dateCreated? 1: a.dateCreated > b.dateCreated? -1: 0;
      });
    }

    res.render("studios/show", {
      avgRating,
      studio,
      sortedTotalReviews,
      tab: "info",
    });

    next();
  },
};

module.exports = controller;
