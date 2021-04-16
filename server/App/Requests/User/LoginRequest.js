const Joi = require('joi');
const Validator = require('../validator');

const schema = Joi.object({
    username: Joi.string().required().alphanum().min(4).max(150),
    password: Joi.string().required()
});

module.exports = new Validator(schema);