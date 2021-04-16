const Joi = require('joi');
const Validator = require('../validator');

const schema = Joi.object({
    name: 		Joi.string().required().max(150),
    email: 		Joi.string().required().email().min(8).max(250),
    username: 	Joi.string().required().alphanum().min(4).max(150),
    password: 	Joi.string().required()
});

module.exports = new Validator(schema);