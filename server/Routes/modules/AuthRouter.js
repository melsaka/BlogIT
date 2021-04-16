const router = require('express').Router();
const LoginController = require(`${$controllers}/Auth/LoginController`);
const RegisterController = require(`${$controllers}/Auth/RegisterController`);

router.post('/login', LoginController.login);
router.post('/register', RegisterController.register);

module.exports = router;