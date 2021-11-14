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

const updateRecord = (id, updatedRecord) => {
    return recordsDB.updateRecord(id, updatedRecord);
}

module.exports = { getAllRecords, addNewRecord, getRecordById, updateRecord }