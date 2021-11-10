const express = require('express');
const router = express.Router();

const categoriesDB = require('../data/categories');

router.get('/', async function (req, res, next) {
    const categories = await categoriesDB.getAllCategories();
    if (!categories.length === 0) return res.status(404).json({ error: "No encontrado", description: "No se encontro ninguna categoria" });

    res.json(categories);
});

router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Parametro faltante", description: "No se puede obtener una categoria si no se proporciona id" });

    const category = await categoriesDB.getCategoryById(id);
    if (!category) return res.status(404).json({ error: "No encontrado", description: "No se encontro ninguna categoria con el id proporcionado" });

    res.json(category);
});

module.exports = router;
