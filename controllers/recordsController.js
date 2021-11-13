const recordsDB = require('../data/records');

const getAllRecords = () => {
    return recordsDB.getAllRecords();
};


module.exports = { getAllRecords }