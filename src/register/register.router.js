const express = require('express');
const router = express.Router();
const controller = require('./registration.controller');

router.post('/', controller.createUser);

module.exports = router;
