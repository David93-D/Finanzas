const conexion = require("../database/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    if (token !== '') {
        const content = jwt.verify(token, 'secret');
        req.data = content;
        next();
    } else {
        res.status(401).json('Token vacio');
    }
}

// LOGIN
const getUser = (req, res) => {
    const {user, password } = req.body;
    
    let sql = `SELECT * FROM users_fi WHERE user = '${user}'`;

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            if (rows.length != 0) {
                const valido = compararContrasenya(password, rows[0].password);
                if (!valido) {
                    res.json({status: false});
                } else {
                    const userForToken = {
                        id: rows[0].id,
                        user: rows[0].user,
                        nombre: rows[0].nombre,
                        apellidos: rows[0].apellidos,
                        email: rows[0].email,
                        role: rows[0].role
                    }
                    const token = jwt.sign(userForToken, 'secret');
                    res.json({token, status: true})
                }
            } else {
                res.json({status: null});
            }
        }
    })
}

const registerUser = async (req, res) => {
    const {user, nombre, apellidos, email, password} = req.body;

    let passwordHash = await generarHash(password);

    let sql = `INSERT INTO users_fi(user, nombre, apellidos, email, role, password) 
    VALUES ('${user}','${nombre}','${apellidos}','${email}','current','${passwordHash}')`;

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({status: 'Usuario Registrado!'});
        }
    })
}

const userExist = (req, res) => {
    const {email, user} = req.body;
    
    let sql = `SELECT * FROM users_fi WHERE email = '${email}' OR user = '${user}'`;

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            if (rows.length > 0) {
                res.json({status: false});
            } else {
                res.json({status: true});
            }
        }
    })
}

async function generarHash(password) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function compararContrasenya(password, hash) {
    const result = bcrypt.compareSync(password, hash);
    return result;
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { user, nombre, apellidos, email} = req.body;

    let sql = `UPDATE users_fi SET user = '${user}', nombre ='${nombre}', apellidos ='${apellidos}', email ='${email}' WHERE id = '${id}'`;

    conexion.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({status: 'Usuario Actualizado!'});
        }
    })
}

module.exports = {
    verifyToken,
    getUser,
    registerUser,
    userExist,
    updateUser
};