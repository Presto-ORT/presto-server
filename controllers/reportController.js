const reportDB = require('../data/reports');

const getReport = (id) => {
    return reportDB.getReport(id);
}

module.exports = { getReport };