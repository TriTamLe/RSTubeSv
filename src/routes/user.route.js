const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.post('/signin', userController.signin);
router.post('/register', userController.register);

module.exports = router;
