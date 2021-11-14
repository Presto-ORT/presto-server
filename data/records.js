const { ObjectId } = require('bson');
const conn = require('./connection.js');
const DATABASE = 'prestoDB';
const RECORDS = 'records';


async function getAllRecords() {
    const connectiondb = await conn.getConnection();
    const records = await connectiondb
        .db(DATABASE)
        .collection(RECORDS)
        .find()
        .toArray();
    return records;
}

async function getRecordById(id) {
    const connectiondb = await conn.getConnection();
    const record = await connectiondb
        .db(DATABASE)
        .collection(RECORDS)
        .findOne({ _id: new ObjectId(id) })

    return record;
}

async function addNewRecord(newRecord) {
    const connectiondb = await conn.getConnection();

    const record = await connectiondb
        .db(DATABASE)
        .collection(RECORDS)
        .insertOne(newRecord)

    return record;
}

async function updateRecord(id, updatedRecord) {
    const connectiondb = await conn.getConnection();

    const record = await connectiondb
        .db(DATABASE)
        .collection(RECORDS)
        .updateOne({ _id: new ObjectId(id) },
            { $set: updateRecord });

    return record;
}

async function deleteRecord(id) {
    const connectiondb = await conn.getConnection();

    const result = await connectiondb
        .db(DATABASE)
        .collection(RECORDS)
        .deleteOne({ _id: new ObjectId(id) })

    return result;
}


module.exports = { getAllRecords, getRecordById, addNewRecord, updateRecord };