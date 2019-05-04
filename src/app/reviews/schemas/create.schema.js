const Joi = require("joi");

const createSchema = Joi.object().keys({
    userId: Joi.string().required(),
    username: Joi.string().required(),
    productId: Joi.string().required(),
    title: Joi.string().required(),
    image: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    review: Joi.string().min(4).max(500).required()
})

module.exports = createSchema;