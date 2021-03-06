const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', async function (req, res, next) {
    try {
        const categories = await categoriesController.getAllCategories();
        if (!categories.length === 0) return res.status(404).json({ error: "No encontrado", description: "No se encontro ninguna categoria" });

        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "Parametro faltante", description: "No se puede obtener una categoria si no se proporciona id" });

        const category = await categoriesController.getCategoryById(id);
        if (!category) return res.status(404).json({ error: "No encontrado", description: "No se encontro ninguna categoria con el id proporcionado" });

        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error', description: 'Lo sentimos, ocurrio un error inesperado. Vuelva a intentar.' });
    }
});

module.exports = router;
