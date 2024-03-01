const db = require("mysql");
const config = require("../config");

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let conection;

function handleCon() {
  conection = db.createConnection(dbConfig);

  conection.connect((err) => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("DB Connected!");
    }
  });

  conection.on("error", (err) => {
    console.error("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function searchUser(table, e_mail) {
  return new Promise((resolve, reject) => {
    conection.query(
      `SELECT * FROM ${table} WHERE email = '${e_mail}'`,
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}
// Función para realizar consultas a la base de datos
function list(table, userId) {
  return new Promise((resolve, reject) => {
    conection.query(
      `SELECT * FROM ${table} WHERE userId = ${userId} and deleted = 0`,
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}

function createUser(table, data) {
  return new Promise((resolve, reject) => {
    conection.query(
      "INSERT INTO ?? (name, email, password) VALUES (?, ?, ?)",
      [table, data.name, data.email, data.password],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function createTask(table, data) {
  return new Promise((resolve, reject) => {
    conection.query(
      `INSERT INTO ?? (title,description,initDate,limitDate,completed,deleted,userId) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        table,
        data.title,
        data.description,
        data.initDate,
        data.limitDate,
        0,
        0,
        data.userId,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function updateTask(table, data) {
  return new Promise((resolve, reject) => {
    conection.query(
      `UPDATE ?? SET title = ?, description = ?, initDate = ?, limitDate = ?, 
      completed = ? WHERE id = ? AND userId = ?`,
      [
        table,
        data.title,
        data.description,
        data.initDate,
        data.limitDate,
        data.completed,
        data.id,
        data.userId,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}
function deleteTask(table, data) {
  return new Promise((resolve, reject) => {
    conection.query(
      `UPDATE ?? SET deleted = 1 WHERE id = ? AND userId = ?`,
      [table, data.id, data.userId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}
module.exports = {
  list,
  createUser,
  searchUser,
  createTask,
  updateTask,
  deleteTask,
};
