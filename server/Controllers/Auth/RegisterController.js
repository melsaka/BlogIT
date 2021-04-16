const User                  = require(`${$models}/User`);
const ApiResponse           = require(`${$helpers}/ApiResponse`);
const RegisterRequest       = require(`${$requests}/User/RegisterRequest`);
const Transformer           = require(`${$transformers}/UserTransformer`);
const JWT                   = require(`${$helpers}/JwtHelper`);

RegisterController = {
    register(request, response) {
        const inputs = RegisterRequest.validate(request, response);

        $catchBadBoys(request, response, async () => {
        	const result = await User.findOne({ $or:[ {email: inputs.email}, {username: inputs.username} ] });

        	if (result) {
        		let field = 'email';
        		
        		if (result.username == inputs.username) {
        			field = 'username'
        		}

				return ApiResponse.validationError(response, [{
                    field: field,
                    message: `This ${field} already exists.`
                }]);
			}

			const user = new User({
	            name: 		inputs.name,
	            username: 	inputs.username,
	            email: 		inputs.email,
	            password: 	inputs.password,
	        });

	        const savedUser = await user.save();
	        
	        const accessToken = JWT.generate({id: savedUser._id});
            
            return ApiResponse.created(response, {accessToken});
        });
    }
}

module.exports = RegisterController;