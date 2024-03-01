const db = require('../../db/mysql');

const tableTask = 'task';

const tableUser = 'user';

function listTasks(userId) {
    return db.list(tableTask, userId);
}

function createUser(data) {
    return db.createUser(tableUser, data);
}
function login(e_mail) {
    return db.searchUser(tableUser, e_mail);
}
function createTask(data) {
    return db.createTask(tableTask, data);
}

module.exports = {
    listTasks,
    createUser,
    login
};
