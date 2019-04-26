const Joi = require('joi');

const updateSchema = Joi.object().keys({
    title: Joi.string(),
    original_title: Joi.string(),
    isbn: Joi.number().integer(),
    editions_count: Joi.number().min(1),
    authors: Joi.string(),
    original_publication: Joi.date(),
    language_code: Joi.string().min(3),
    rating: Joi.number().max(5),
    rating_count: Joi.number(),
    image_url: Joi.string().uri({ scheme: ['http', 'https'] }),
    quantity: Joi.number().integer().min(0),
    price: Joi.number().min(0),
    discount: Joi.number().min(0).max(99),
});

module.exports = updateSchema;