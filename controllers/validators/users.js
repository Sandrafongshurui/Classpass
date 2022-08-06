const Joi = require('joi')

const validators = {

    register: Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        confirmpassword: Joi.string().required().valid(Joi.ref('password')).min(4),
        role: Joi.string()//aking the radio's value
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    })
    
}

module.exports = validators
