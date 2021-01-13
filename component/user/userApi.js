const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/all', userController.allUser);

router.get('/search', userController.search);

router.get('/:id', userController.getUserById);

router.get('/:id/block', userController.blockUser);

router.get('/finished-game/:id', userController.getFinishedGamesById);


module.exports = router;
