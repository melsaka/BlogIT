const OK 				= 200;
const CREATED 			= 201;
const NO_CONTENT 		= 204;
const UNAUTHORIZED 		= 401;
const FORBIDDEN  		= 403;
const NOT_FOUND 		= 404;
const VALIDATION_ERROR	= 422;
const SERVER_ERROR 		= 500;

class ApiResponse {
	ok(response, data) {
		return response.status(OK).json(data);
	}

	created(response, data) {
		return response.status(CREATED).json(data);
	}

	noContent(response) {
		return response.status(NO_CONTENT).json({});
	}

	unauthorized(response, message = 'Unauthorized') {
		return this.respondWithError(response, UNAUTHORIZED, message);
	}

	forbidden(response, message = 'Forbidden') {
		return this.respondWithError(response, FORBIDDEN, message);
	}

	notFound(response, message = 'Resource Not Found') {
		return this.respondWithError(response, NOT_FOUND, message);
	}

	validationError(response, errors) {
		return response.status(VALIDATION_ERROR)
                    .json({ 
                        status: VALIDATION_ERROR, 
                        title: 'Validation Error',
                        errors: errors
                    });
	}

	serverError(response, error) {
		console.log(error); // log error in file or database
		return this.respondWithError(response, SERVER_ERROR, 'Internal Server Error');
	}

	respondWithError(response, status, message) {
		return response.status(status).json({
            status: status,
            title: message
        });
	}
}

module.exports = new ApiResponse;