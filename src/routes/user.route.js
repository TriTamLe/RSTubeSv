const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/user.controller');

router.post('/signin', userController.signin);
router.post('/register', userController.register);

module.exports = router;
