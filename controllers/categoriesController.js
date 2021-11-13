const categoriesDB = require('../data/categories');

const getAllCategories = () => {
    return categoriesDB.getAllCategories()
}

module.exports = { getAllCategories };