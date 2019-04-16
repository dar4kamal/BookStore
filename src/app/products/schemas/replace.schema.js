const Joi = require('joi');

const replaceSchema = Joi.object().keys({
    title: Joi.string().required(),
    original_title: Joi.string().required(),
    isbn: Joi.number().integer().required(),
    editions_count: Joi.number().min(1).required(),
    authors: Joi.string().required(),
    original_publication: Joi.date().default(Date.now,"First Publish Date").required(),
    language_code: Joi.string().min(3).required(),
    rating: Joi.number().max(5).required(),
    rating_count: Joi.number().required(),
    image_url: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    quantity: Joi.number().integer().min(0).required(),
    price: Joi.number().min(0).required(),
    discount: Joi.number().min(0).max(99).required(),
});

module.exports = replaceSchema;