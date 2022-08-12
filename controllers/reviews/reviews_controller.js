const reviewModel = require("../../models/reviews/reviews");
const lessonModel = require("../../models/lessons/lessons");

const controller = {
  createReview: async (req, res) => {
    let lesson = null
    //create reveiw add in in the lessons
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
        { new: true } //new means it will return the updated doc
      );
      console.log(lesson .reviews);
    } catch (err) {
      
      res.send("failed to create review");
      return;
    }

    res.redirect(`/users/history`)
  },

  showReviewForm: async (req, res) => {
    res.render("users/review-form", {
      lesson: req.params.lesson_id,
      errorObject:{}
    });
  },
};

module.exports = controller;
