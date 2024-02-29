const db = require('../../db/mysql');

let table = 'task';

function list(table, userId) {
    return db.list(table, userId);
}

module.exports = {
    list
};
