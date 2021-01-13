const express = require('express');
const router = express.Router();
const gameController = require('./gameController')

router.get('/finish', gameController.allFinishGame);

module.exports = router
