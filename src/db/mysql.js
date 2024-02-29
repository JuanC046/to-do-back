const db = require('mysql');
const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let conection;

function handleCon() {
    conection = db.createConnection(dbConfig);

    conection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    conection.on('error', (err) => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    });
}

handleCon();

function createUser(table, data) {
    return new Promise((resolve, reject) => {
        conection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function searchUser(table, e_mail, password) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE e_mail = '${e_mail}' AND password = '${password}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}
// Función para realizar consultas a la base de datos
function list(table, userId) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE userId = ${userId}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

module.exports = {
    list,
    createUser,
    searchUser
};