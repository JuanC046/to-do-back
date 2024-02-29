// Configuración del servidor y base de datos

require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 3000
    },
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'sindical'
    }
    };