const Joi = require('joi');
const productSchema = require('../../products/schemas/update.schema')

const cartItem = Joi.object().keys({
    productId: Joi.string(),
    product: productSchema,
    quantity: Joi.number()
})

const createSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().max(256).required(),
    password: Joi.string().min(8).max(60).required(),
    role: Joi.string().default("user", "Customer Init"),
    cart: Joi.object().keys({
        items: Joi.array().items(cartItem),
        total: Joi.number()})
});

module.exports = createSchema;