const Joi = require('joi');

const createSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    role: Joi.string().required()
});

module.exports = createSchema;