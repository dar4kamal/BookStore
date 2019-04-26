const Joi = require('joi');

const createSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().max(256).required(),
    password: Joi.string().min(8).max(60).required(),
    role: Joi.string().default("user", "Customer Init")
});

module.exports = createSchema;