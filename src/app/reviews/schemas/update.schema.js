const Joi = require("joi");

const updateSchema = Joi.object().keys({
    userId: Joi.string(),
    username: Joi.string(),
    productId: Joi.string(),
    title: Joi.string(),
    image: Joi.string().uri({ scheme: ['http', 'https'] }),
    review: Joi.string().min(4).max(500)
})

module.exports = updateSchema;