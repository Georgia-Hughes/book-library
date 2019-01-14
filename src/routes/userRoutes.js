const express = require('express');
const UsersController = require('../controllers/userController');

const router = express.Router();

router.post('/', UsersController.create);

module.exports = router;
