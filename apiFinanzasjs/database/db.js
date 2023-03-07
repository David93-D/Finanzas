const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
    database: process.env.DB_DBNAME
});

conexion.connect((err) => {
    if (err) {
        console.log("ERROR: " + err);
    } else {
        console.log("Connexion exitosa!!");
    }
});

module.exports = conexion;