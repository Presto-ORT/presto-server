const { ObjectId } = require('bson');
const conn = require('./connection.js');
const DATABASE = 'prestoDB';
const RECORDS = 'records';


async function getReport(id) {
    const connectiondb = await conn.getConnection();
    const report = await connectiondb
        .db(DATABASE)
        .collection(RECORDS)
        .aggregate(
            [
                { '$match': { 'user': new ObjectId(id) } },
                { '$group': { '_id': '$category', 'total': { '$sum': '$amount' } } },
                { '$project': { '_id': false, 'category': '$_id', 'total': true } },
                { '$sort': { 'total': -1 } }
            ]
        ).toArray();

    return report;
}

module.exports = { getReport };