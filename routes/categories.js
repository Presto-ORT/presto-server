const express = require('express');
const router = express.Router();

const categoriesDB = require('../data/categories');
const categoriesController = require('../controllers/categoriesController');

router.get('/', async function (req, res, next) {
    const categories = await categoriesController.getAllCategories();
    if (!categories.length === 0) return res.status(404).json({ error: "No encontrado", description: "No se encontro ninguna categoria" });

    res.json(categories);
});

router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Parametro faltante", description: "No se puede obtener una categoria si no se proporciona id" });

    const category = await categoriesController.getCategoryById(id);
    if (!category) return res.status(404).json({ error: "No encontrado", description: "No se encontro ninguna categoria con el id proporcionado" });

    res.json(category);
});

//Comentario para PR

module.exports = router;
