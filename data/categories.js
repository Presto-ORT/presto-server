const { ObjectId } = require('bson');
const conn = require('./connection.js');
const DATABASE = 'prestoDB';
const CATEGORIES = 'categories';


async function getAllCategories() {
    const connectiondb = await conn.getConnection();
    const categories = await connectiondb
        .db(DATABASE)
        .collection(CATEGORIES)
        .find()
        .toArray();

    return categories;
}

async function getCategoryById(id) {
    const connectiondb = await conn.getConnection();
    const category = await connectiondb
        .db(DATABASE)
        .collection(CATEGORIES)
        .findOne({ _id: new ObjectId(id) })

    return category;
}

module.exports = { getAllCategories, getCategoryById };