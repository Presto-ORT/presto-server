const recordsDB = require('../data/records');

const getAllRecords = () => {
    return recordsDB.getAllRecords();
};

const addNewRecord = (newRecord) => {
    return recordsDB.addNewRecord(newRecord);
}

module.exports = { getAllRecords, addNewRecord }