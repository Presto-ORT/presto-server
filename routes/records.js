const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController')

router.get('/', async function (req, res, next) {
    try {
        let records = await recordsController.getAllRecords();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
    }
});

router.post('/', async function (req, res, next) {
    try {
        let { record } = req.body;
        if (!record) return res.status(406).json({ error: 'Datos faltantes', description: 'No se recibieron datos para guardar' });

        let saved = await recordsController.addNewRecord(record);
        if (!saved.insertedId) return res.status(500).json({ error: 'Error' })

        res.status(201).send('Registro creado');
    } catch (error) {
        res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
    }
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
