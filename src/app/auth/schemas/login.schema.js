const Joi = require('joi');

const loginSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(60).required()
});

module.exports = loginSchema; 