const reviewValidators = require("../controllers/validators/reviews");

module.exports = {
  reviewIsValidated: (req, res, next) => {
    const validationResults = reviewValidators.createReview.validate(req.body, {
      abortEarly: false,
    });
    let errorObject = {
      review: null,
      rating: null,
    };
    if (validationResults.error) {
      console.log(validationResults.error);
      validationResults.error.details.forEach((detail) => {
        errorObject[detail.context.key] = detail.message;
      });
      res.render("users/review-form", {
        lesson: req.params.lesson_id,
        errorObject
      });
     
      return;
     
    } 
    next();
  },
};
