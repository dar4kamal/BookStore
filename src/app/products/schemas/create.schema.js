const Joi = require('joi');

const createSchema = Joi.object().keys({
    title: Joi.string().required(),
    original_title: Joi.string().required(),
    isbn: Joi.number().integer().required(),
    in_stock: Joi.number().integer().min(1).required(),
    authors: Joi.string().required(),
    publication_year: Joi.date().required(),
    lang: Joi.string().min(3).required(),
    rating: Joi.number().required(),
    image: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    price: Joi.number().min(0).required()
});

module.exports = createSchema;