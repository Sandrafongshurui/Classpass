const reviewModel = require("../../models/reviews/reviews");
const lessonModel = require("../../models/lessons/lessons");
// const reviewValidators = require("../validators/reviews");
// const userModel = require("../../models/users/users");
// const { date } = require("joi");

const controller = {
  createReview: async (req, res) => {
    let newReviewId = null;
    try {
      const newReview = await reviewModel.create({
        user: req.params.user_id,
        lesson: req.params.lesson_id,
        review: req.body.review,
        rating: req.body.rating,
        dateCreated: Date.now(),
      });

      newReviewId = newReview._id;
    } catch (err) {
      res.send("failed to create review");
      return;
    }

    //add the review to the lesson
    try {
      console.log(newReviewId);
      const doc = await lessonModel.findOneAndUpdate(
        { _id: req.params.lesson_id },
        { $push: { reviews: newReviewId } },
        { new: true } //new means it will return teh update doc, if not it will return doc b4 updates
      );
      console.log(doc.reviews);
    } catch (err) {
      console.log(err);
      res.send("failed to add to lesson");
      return;
    }
    res.send("created review");
  }
};

module.exports = controller;
