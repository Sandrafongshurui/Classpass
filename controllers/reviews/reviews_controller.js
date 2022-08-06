const reviewModel = require("../../models/reviews/reviews");
const lessonModel = require("../../models/lessons/lessons");

// const userModel = require("../../models/users/users");
// const { date } = require("joi");

const controller = {
  createReview: async (req, res) => {
    let lesson = null
    //create reviw add in in teh lessons
    try {
      const newReview = await reviewModel.create({
        user: req.session.user,
        lesson: req.params.lesson_id,
        review: req.body.review,
        rating: req.body.rating,
        dateCreated: Date.now(),
      });
      console.log(newReview);

      lesson = await lessonModel.findOneAndUpdate(
        { _id: req.params.lesson_id },
        { $push: { reviews: newReview._id } },
        { new: true } //new means it will return teh update doc, if not it will return doc b4 updates
      );
      console.log(lesson .reviews);
    } catch (err) {
      res.send("failed to create review");
      return;
    }

    res.redirect(`/users/${req.session.user}/history`)
  },

  showReviewForm: async (req, res) => {
    res.render("users/review-form", {
      // user: req.session.user,
      lesson: req.params.lesson_id
    });
  },
};

module.exports = controller;
