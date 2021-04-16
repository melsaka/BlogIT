const User                  = require(`${$models}/User`);
const LoginRequest          = require(`${$requests}/User/LoginRequest`);
const ApiResponse           = require(`${$helpers}/ApiResponse`);
const JWT                   = require(`${$helpers}/JwtHelper`);

LoginController = {
    login(request, response) {
        const inputs = LoginRequest.validate(request, response);

        $catchBadBoys(request, response, async () => {
            const user = await User.findOne({username: inputs.username});

            if (!user) {
                return ApiResponse.validationError(response, [{
                            field: 'username',
                            message: 'Username not exist'
                        }]);
            }

            const match = await user.comparePassword(inputs.password);

            if (match) {
                const accessToken = JWT.generate({id: user._id});
                return ApiResponse.ok(response, {accessToken});
            }

            return ApiResponse.validationError(response, [{
                field: 'username',
                message: 'Username/password not valid'
            }]);

        });
    }
}

module.exports = LoginController;