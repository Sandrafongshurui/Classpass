const Joi = require("joi");

const validators = {
  createReview: Joi.object({
    review: Joi.string().required(),
    rating: Joi.number().min(1).required(),
  }),
};

module.exports = validators;
