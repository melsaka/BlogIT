const { ValidationError } = require("joi");

module.exports = (app) => {
    app.use((error, request, response, next) => {

        if (isBadRequest(error)) {
            return handleBadRequests(error, response);
        }

        if (isUnprocessableEntity(error)) {
            return handleValidationErrors(error, response);
        }

        if(error instanceof Error) {
            console.log(error);
        }

        next();
    });
}

function isBadRequest(error) {
    return error instanceof SyntaxError && error.status === 400 && 'body' in error;
}

function isUnprocessableEntity(error) {
    return error instanceof ValidationError && error.status === 422;
}

function handleBadRequests(error, response) {
    return response.status(error.status)
                    .json({ 
                        status: error.status, 
                        title: error.message 
                    });
}

function handleValidationErrors(error, response) {
    return response.status(error.status)
                    .json({ 
                        status: error.status, 
                        title: error.message, 
                        errors: error.details 
                    });
}