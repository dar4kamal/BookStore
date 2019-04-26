const Joi = require('joi');

const updateSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email().max(256),
    role: Joi.string().default("user", "Customer Init")
});

module.exports = updateSchema;