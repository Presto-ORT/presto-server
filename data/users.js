const { ObjectId } = require('bson');
const conn = require('./connection.js');
const DATABASE = 'prestoDB';
const COLLECTION = 'users';

async function getUserById(id) {
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
        .db(DATABASE)
        .collection(COLLECTION)
        .findOne({ "_id": new ObjectId(id) })

    return user;
}

async function getUserByEmail(email) {
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
        .db(DATABASE)
        .collection(COLLECTION)
        .findOne({ "email": email })

    return user;
}

async function addNewUser(user) {
    const connectiondb = await conn.getConnection();
    const inserted = await connectiondb
        .db(DATABASE)
        .collection(COLLECTION)
        .insertOne(user);

    return inserted;
}

module.exports = { getUserById, getUserByEmail, addNewUser };