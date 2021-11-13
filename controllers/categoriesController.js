const categoriesDB = require('../data/categories');

const getAllCategories = () => {
    return categoriesDB.getAllCategories()
}

const getCategoryById = (id) => {
    return categoriesDB.getCategoryById(id);
}

module.exports = { getAllCategories, getCategoryById };