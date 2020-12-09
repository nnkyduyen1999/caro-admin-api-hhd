const express = require('express');
const router = express.Router();
const userController = require('./userController');


router.get('/', userController.loadById);

module.exports = router;
