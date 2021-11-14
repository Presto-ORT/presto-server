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

router.get('/:id', async function (req, res, next) {
    try {
        let { id } = req.params
        if (!id) return res.status(406).json({ error: 'Datos faltantes', description: 'No se recibieron datos para guardar' });

        let record = recordsController.getRecordById(id);
        if (!record) return res.status(404).json({ error: "Error", description: "Registro no encontrado" });

        res.json(record);
    } catch (error) {
        res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        let { id } = req.params;
        if (!id) return res.status(406).json({ error: 'Datos faltantes', description: 'No se recibieron datos para guardar' });

        let updatedRecord = req.body.record;
        if (!updatedRecord) return res.status(406).json({ error: 'Datos faltantes', description: 'No se recibieron datos para guardar' });

        let record = recordsController.getRecordById(id);
        if (!record) return res.status(404).json({ error: "Error", description: "Registro no encontrado" });

        let updated = await recordsController.updateRecord(id, updatedRecord);
        if (!updated || updated.modifiedCount === 0) return res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });

        res.json({});
    } catch (error) {
        res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
    }
});


router.delete('/:id', async function (req, res, next) {
    let { id } = req.params;
    if (!id) return res.status(406).json({ error: 'Datos faltantes', description: 'No se recibieron datos para guardar' });

    let record = await recordsController.getRecordById(id);
    if (!record) return res.status(404).json({ error: "Error", description: "Registro no encontrado" });

    let deleted = await recordsController.deleteRecord(id);
    if (!deleted || deleted.deletedCount === 0) return res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });

    res.status(204).send({});
});

function authorization(req, res, next) {
    // validar token de usuario
    // si no esta ok, dar error
    // sino guardar user en request
    next();
}

module.exports = router;
