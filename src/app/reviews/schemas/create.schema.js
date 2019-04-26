const Joi = require("joi");

const createSchema = Joi.object().keys({
    productId: Joi.string().required(),
    userId: Joi.string().required(),
    review: Joi.string().required(),
})

module.exports = {
    createSchema
}