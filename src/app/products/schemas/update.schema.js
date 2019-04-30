const Joi = require('joi');

const updateSchema = Joi.object().keys({
    title: Joi.string(),
    original_title: Joi.string(),
    isbn: Joi.number().integer(),
    in_stock: Joi.number().integer().min(1),
    authors: Joi.string(),
    publication_year: Joi.date(),
    lang: Joi.string().min(3),
    rating: Joi.number().required(),
    image: Joi.string().uri({ scheme: ['http', 'https'] }),
    price: Joi.number().min(0)
});

module.exports = updateSchema;