const db = require('../../db/mysql');

const tableTask = 'task';

const tableUser = 'user';

function listTasks(userId) {
    return db.list(tableTask, userId);
}

function createUser(data) {
    return db.createUser(tableUser, data);
}
function login(e_mail, password) {
    return db.searchUser(tableUser, e_mail, password);
}

module.exports = {
    listTasks,
    createUser,
    login
};
