const Joi = require("joi");

const updateSchema = Joi.object().keys({
    productId: Joi.string(),
    userId: Joi.string(),
    review: Joi.string().min(4).max(500),
})

module.exports = updateSchema;