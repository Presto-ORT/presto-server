const recordsDB = require('../data/records');

const getAllRecords = async (id, date) => {
    let records = await recordsDB.getAllRecords(id);

    const { day, month, year } = date;

    if (day && month && year) {
        let filteredRecords = records.filter((record) => {

            recordDate = new Date(record.date)

            return recordDate.getDate() == day &&
                recordDate.getMonth() == month &&
                recordDate.getFullYear() == year
        });

        return filteredRecords
    }

    return records;
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

const deleteRecord = (id) => {
    return recordsDB.deleteRecord(id);
}

module.exports = { getAllRecords, addNewRecord, getRecordById, updateRecord, deleteRecord }