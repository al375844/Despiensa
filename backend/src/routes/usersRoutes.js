const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

//'/users'
router.post('/newUser', usersController.newUser);

router.put('/modifyUser/:usuarioViejo/:usuarioNuevo/:nombre/:apellidos/:correo', usersController.modifyUser);

router.put('/newPassword/:usuario/:oldPassword/:newPassword', usersController.newPassword);

router.delete('/deleteUser/:usuario', usersController.deleteUser);

router.get('/getUser/:usuario', usersController.getUser);


module.exports = router;