const reviewValidators = require("../controllers/validators/reviews");  
  
module.exports = {
    reviewIsValidated:(req, res, next) => {
        const validationResults = reviewValidators.createReview.validate(req.body);
        if (validationResults.error) {
            res.send(validationResults.error);
           // res.redirect(`/users//history/${req.params.lesson_id}/review`
            return;
          }
        next()
    },
   
};

 
