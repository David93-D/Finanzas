const router = require('express').Router();
const {verifyToken, testing, registerUser, userExist, getUser} = require("../controllers/auth.controller.js");

router.post('/test', verifyToken, testing); // PARA PRUEBAS DE JWT
router.post('/login', getUser);
router.post('/existUser', userExist);
router.post('/registroUsuarios', registerUser);

module.exports = router;