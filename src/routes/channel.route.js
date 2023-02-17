const express = require('express');
const router = express.Router();
const channelController = require('../app/controllers/channel.controller');
const verifyToken = require('../app/middleware/auth.middleware');

router.get('/load', verifyToken, channelController.load);
router.post('/add', verifyToken, channelController.add);
router.delete('/:channelId', verifyToken, channelController.delete);

module.exports = router;
