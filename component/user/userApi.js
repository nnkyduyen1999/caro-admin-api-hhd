const express = require('express');
const router = express.Router();
const userController = require('./userController');


router.get('/', userController.loadById);

router.get('/:id', userController.getUserById);

module.exports = router;
