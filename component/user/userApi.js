const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/all', userController.allUser);

router.get('/', userController.loadById);

router.get('/search', userController.search);

router.get('/:id', userController.getUserById);





module.exports = router;
