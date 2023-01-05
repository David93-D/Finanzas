const router = require('express').Router();
const { registerUser, userExist, getUser, updateUser } = require("../controllers/auth.controller.js");

router.post('/login', getUser);
router.post('/existUser', userExist);
router.post('/registroUsuarios', registerUser);
router.put('/actualizarUsuario/:id', updateUser);

module.exports = router;