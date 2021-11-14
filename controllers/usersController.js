const usersDB = require('../data/users');

const getUserById = (id) => {
    return usersDB.getUserById(id);
}

const getUserByEmail = (email) => {
    return usersDB.getUserByEmail(email);
}

const addNewUser = (user) => {
    return usersDB.addNewUser(user);
}

module.exports = { getUserById, getUserByEmail, addNewUser };