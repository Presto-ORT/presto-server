const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersController = require('../controllers/usersController');
const reportsController = require('../controllers/reportController');

router.get('/', authorization, async function (req, res, next) {
    let report = await reportsController.getReport(req.user._id);

    res.json(report);
});

async function authorization(req, res, next) {
    if (req.headers["authorization"]) {
        let token = jwt.decode(req.headers["authorization"].replace("Bearer ", ""))
        let user = await usersController.getUserById(token._id);
        if (!user) {
            res.status(401).json({})
        } else {
            req.user = user;
            next();
        }
    } else {
        res.status(401).json({})
    }
}

module.exports = router;
