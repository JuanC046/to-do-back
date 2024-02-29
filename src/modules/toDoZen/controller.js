const db = require('../../db/mysql');

const table = 'task';


function listTasks(userId) {
    return db.list(table, userId);
}

module.exports = {
    listTasks
};
