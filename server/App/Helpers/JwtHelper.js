const ApiResponse = require('./ApiResponse');
const jwt = require('jsonwebtoken');

class JwtHelper {
	generate(user, expiresIn = '12h') {
		return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
	}

	checkTokenMiddleware(request, response, next) {
		const authorizationHeader = request.headers['authorization'];
		
		const token = authorizationHeader && authorizationHeader.split(' ')[1];
		
		if (token == null) {
			return ApiResponse.unauthorized(response);
		}

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
			if (error) {
				return ApiResponse.forbidden(response, 'TokenExpiredError');
			}

			request.user = user;

			next();
		});
	}
}

module.exports = new JwtHelper();