const Joi = require('joi');
const Validator = require('../validator');

const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
});

module.exports = new Validator(schema);