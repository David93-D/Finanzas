const conexion = require("../database/db.js");

const getHistoricoRegistros = (req, res) => {
    let sql = 'SELECT * FROM registros_fi';
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    })
}

const getRegistrosMes = (req, res) => {
    const {anyo, mes} = req.body;

    let sql = `SELECT * FROM registros_fi WHERE anyo = '${anyo}' AND mes = '${mes}'`;
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    })
}

const getRegistroParticular = (req, res) => {
    const {id} = req.params;
    let sql = 'select * from registros_fi where id = ?';
    conexion.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    })    
}

const addRegistro = (req, res) => {
    const {anyo, mes, dia, concepto, detalle, cantidad, tipo} = req.body;

    let sql = `INSERT INTO registros_fi(anyo, mes, dia, concepto, detalle, cantidad, tipo) 
    VALUES ('${anyo}','${mes}','${dia}','${concepto}','${detalle}','${cantidad}','${tipo}')`;

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({status: 'Registro agregado'});
        }
    })
}

const editRegistro = (req, res) => {
    const {id} = req.params;
    const {concepto, detalle, cantidad, tipo} = req.body;

    console.log(concepto, detalle, cantidad, tipo);

    let sql = `UPDATE registros_fi SET concepto ='${concepto}', detalle ='${detalle}', cantidad ='${cantidad}', tipo ='${tipo}' WHERE id = '${id}'`;
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({status: 'Registro modificado'});
        }
    })
}

const delRegistro = (req, res) => {
    const {id} = req.params;

    let sql = `DELETE FROM registros_fi WHERE id = '${id}'`;
    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({status: 'Registro eliminado'});
        }
    })
}

module.exports = {
    getHistoricoRegistros,
    getRegistrosMes,
    addRegistro,
    editRegistro,
    getRegistroParticular,
    delRegistro
};