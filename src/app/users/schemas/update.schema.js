const Joi = require('joi');

const updateSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(30),    
    role: Joi.string().default("user", "Customer Init")
});

module.exports = updateSchema;