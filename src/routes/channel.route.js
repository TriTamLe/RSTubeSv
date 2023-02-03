const express = require('express');
const router = express.Router();
const channelController = require('../app/controllers/ChannelController');

router.get('/load', channelController.load);
router.post('/add', channelController.add);
router.delete('/:channelId', channelController.delete);

module.exports = router;
