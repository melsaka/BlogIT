const { ValidationError } = require("joi");

class Validator{
    constructor(schema) {
        this.schema = schema;
    }

    validate(request, response) {
        const attributes = {};
        
        this.schema.$_terms.keys.forEach(element => {
            attributes[element.key] = request.body[element.key];
        });
        
        const { error, value } = this.schema.validate(attributes, {abortEarly: false});

        if(error == undefined) {
            return value;
        }

        const errorsBag = [];

        error.details.map(element => {
            errorsBag.push({
                field: element.context.key,
                message: element.message.replace(/\"/g, '')
            });
        });

        const validationException = new ValidationError('Validation Error', errorsBag);

        validationException.status = 422;

        throw validationException;
    }
}

module.exports = Validator;