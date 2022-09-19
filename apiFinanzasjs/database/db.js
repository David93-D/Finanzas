const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'db_finanzaspersonales'
});

conexion.connect((err) => {
    if (err) {
        console.log("ERROR: " + err);
    } else {
        console.log("Connexion exitosa!!");
    }
});

module.exports = conexion;