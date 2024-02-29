const db = require('mysql');
const config = require('../../config');

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

// Función para realizar consultas a la base de datos
function list(table, userId) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE userId = ${userId}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}