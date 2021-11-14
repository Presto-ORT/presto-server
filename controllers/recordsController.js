const recordsDB = require('../data/records');

const getAllRecords = () => {
    return recordsDB.getAllRecords();
};

const getRecordById = (id) => {
    return recordsDB.getRecordById(id);
};

const addNewRecord = (newRecord) => {
    return recordsDB.addNewRecord(newRecord);
}

module.exports = { getAllRecords, addNewRecord, getRecordById }