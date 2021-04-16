const Joi = require('joi');
const Validator = require('../validator');

const schema = Joi.object({
    name: Joi.string().required()
});

module.exports = new Validator(schema);