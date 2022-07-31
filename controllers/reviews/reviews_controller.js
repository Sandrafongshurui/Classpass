const reviewModel = require("../../models/reviews/reviews");
const reviewValidators = require("../validators/reviews");
const userModel = require('../../models/users/users')

const controller = {
    createReview: async (req, res) => {
         // create the reviews
    try {
      await reviewModel.create({
        user_id: user._id,
        product_id: productID,
        rating: validatedValues.rating,
      });
    } catch (err) {
      res.redirect("/users/login");
      return;
    }
    }
//   createReview: async (req, res) => {
//     // front end joi validations here ...
//     const validationResults = reviewValidators.createReview.validate(req.body);
//     const lessonId = req.params.lesson_id
//     if (validationResults.error) {
//       res.send(validationResults.error);
//       console.log(validationResults.error);
//       return;
//     }
//     // get user from DB
//     const validatedResults = validationResults.value;
//     let user = null;

//     //find the user
//     try {
//       user = await userModel.findOne({ email: validatedResults.email });
//     } catch (err) {
//       res.redirect("/users/login");
//       return;
//     }

//     // create the reviews
//     try {
//       await reviewModel.create({
//         user_id: user._id,
//         product_id: productID,
//         rating: validatedValues.rating,
//       });
//     } catch (err) {
//       res.redirect("/users/login");
//       return;
//     }

//     res.redirect("/products");
//   },
};

module.exports = controller;
