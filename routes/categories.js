const express = require('express');
const { BandwidthLimitExceeded } = require('http-errors');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
