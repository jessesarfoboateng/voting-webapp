const express = require('express');
const router = express.Router();
const ussdHandler = require('../ussd/handler');

router.post('/', ussdHandler);

module.exports = router;
