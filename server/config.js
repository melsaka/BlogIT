const path = require('path');
const ApiResponse = require(`./App/Helpers/ApiResponse`);
const { ValidationError } = require("joi");

module.exports = () => {
    require('dotenv').config();

    global.$root        	= __dirname;

    global.$controllers 	= path.join($root, '/Controllers');

    global.$middlewares 	= path.join(__dirname, '/Middlewares');

    global.$models      	= path.join(__dirname, '/Models');

    global.$public      	= path.join(__dirname, '/Public');
    
    global.$routes      	= path.join(__dirname, '/Routes');

    global.$requests    	= path.join(__dirname, '/App/Requests');

    global.$helpers   		= path.join(__dirname, '/App/Helpers');

    global.$transformers   	= path.join(__dirname, '/App/transformers');

    global.$catchBadBoys    = function (request, response, method) {
        try {
            return method(request, response);
        }
        catch (error) {
            ApiResponse.serverError(response, error);
        }
    }
}
