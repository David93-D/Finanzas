const conexion = require("../database/db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    if (token !== '') {
        const content = jwt.verify(token, 'secret');
        console.log(content);
        req.data = content;
        next();
    } else {
        res.status(401).json('Token vacio');
    }
} 

const testing = (req, res, next) => {
    res.json("Información secreta");
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
                        user: rows[0].user,
                        role: rows[0].role
                    }

                    const token = jwt.sign(userForToken, 'secret');

                    res.json({token})
                }
            } else {
                res.json({status: null});
            }
        }
    })
}

const registerUser = async (req, res) => {
    const {user, nombre, apellidos, email, role, password} = req.body;

    let passwordHash = await generarHash(password);

    let sql = `INSERT INTO users_fi(user, nombre, apellidos, email, role, password) 
    VALUES ('${user}','${nombre}','${apellidos}','${email}','${role}','${passwordHash}')`;

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
            console.log(rows.length);
            if (rows.length != 0) {
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

module.exports = {
    verifyToken,
    testing,
    getUser,
    registerUser,
    userExist
};