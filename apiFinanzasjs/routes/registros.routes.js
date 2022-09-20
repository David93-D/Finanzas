const router = require('express').Router();
const { getHistoricoRegistros, getRegistrosMes, getRegistroParticular, addRegistro, editRegistro, delRegistro } = require("../controllers/registros.controller.js");

router.post('/', getRegistrosMes);
router.get('/historico', getHistoricoRegistros);
router.get('/:id', getRegistroParticular);
router.post('/', addRegistro);
router.put('/:id', editRegistro);
router.delete('/:id', delRegistro);

module.exports = router;