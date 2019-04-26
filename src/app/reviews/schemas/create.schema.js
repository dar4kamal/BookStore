const Joi = require("joi");

const createSchema = Joi.object().keys({
    productId: Joi.string().required(),
    userId: Joi.string().required(),
    review: Joi.string().min(4).max(500).required(),
})

module.exports = createSchema;