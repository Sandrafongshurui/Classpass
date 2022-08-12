const studioModel = require("../../models/studios/studios");
const reviewModel = require("../../models/reviews/reviews");

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

  // getStudioData: async (req, res, next) => {
  //   console.log("----->", req.body);
  //   //let response = await fetch('/readme.txt');
  //   // let data = await response.text();

  //   const studios = await studioModel.find({
  //     location: { $in: req.body.location },
  //   });

  //   return res.json();
  // },

  showListOfStudios: async (req, res, next) => {
    let location = null;
    let amenities = null;
    let activities = null;
    let queryUrl = null;
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
        return
      } else {
        console.log("has location query");
        console.log(req.body);
        const filterConditions = {};

        Object.entries(req.body).forEach(([key, value]) => {
          filterConditions[key] = {
            [key === "amenities" ? "$all" : "$in"]: value,
          };
        });
        console.log(filterConditions )

        // studios = await studioModel.find({
        //   location: { $in: req.body.location },
        //   amenities: { $all: req.body.amenities },
        //   activities: { $in: req.body.activities },
        // });
        studios = await studioModel.find(filterConditions);

        
      }
      // if(req.query.amenities){
      //   studios = await studioModel.find(
      //     {amenities: { $in: req.query.amenities}},
      //     );
      //     req.session.studios = studios
      // }

      // console.log(studios);
    } catch (err) {
      console.log(err);
      res.send(err);
      return;
    }
    // console.log(studios)

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
      })
    

    //filter for lessons with reviews only
    const lessonWithReviews = studio.lessons.filter(
      (eachLesson) => eachLesson.reviews.length !== 0
    );

    // // const newavgRating = studio.lessons.aggregate([ {$addFields : {lessonsAvgRating : {$avg : "$reviews.rating"}}} ])
    // console.log("----->",studio )
    //combine all reviews from each lesson
    //get ratinsg as well
    let totalRatings = 0
    let totalReviews = [];
    lessonWithReviews.forEach((eachLesson) => {
      eachLesson.reviews.forEach((eachReview) => {
        //get ratings
        totalRatings += eachReview.rating
        //add lesson name and  instructor to each review
        eachReview.name = eachLesson.name;
        eachReview.instructor = eachLesson.instructor;
        totalReviews.push(eachReview);
      });
    });
    
    let avgRating = Math.round((totalRatings/totalReviews.length)* 10) / 10;
    console.log(avgRating)


    //sort the dates
    const sortedTotalReviews = totalReviews.sort((a, b) => {
      //-1 means first go before second, 1 means it goes after, 0 means the same
      return a.dateCreated < b.dateCreated
        ? 1
        : a.dateCreated > b.dateCreated
        ? -1
        : 0;
    });
    //console.log("------>", sortedTotalReviews);


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
