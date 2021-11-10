const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with all records');
});

router.post('/', function (req, res, next) {
    // recibo importe, categoria, subcat, fecha, descripcion
    res.send('Create a record');
});

router.get('/:id', function (req, res, next) {
    // recibo id
    // si encuentro gasto, lo mando
    // sino, respondo error
    res.send('Get a record');
});

router.delete('/:id', function (req, res, next) {
    //recibo un id
    //si lo encuentro lo borro
    //si no devuelve un error
    res.send('Get a record');
});

function authorization(req, res, next) {
    // validar token de usuario
    // si no esta ok, dar error
    // sino guardar user en request
    next();
}

module.exports = router;
