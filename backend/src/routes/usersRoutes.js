const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

//'/users'
router.post('/newUser/:usuario/:nombre/:apellidos/:correo/:password/:alergias/:intolerancias/:planName/:fechaNacimiento', usersController.newUser);

router.put('/modifyUser/:usuario/:nombre/:apellidos/:correo', usersController.modifyUser);

router.put('/newPassword/:usuario/:oldPassword/:newPassword', usersController.newPassword);

router.delete('/deleteUser/:usuario', usersController.deleteUser);

router.get('/getUser/:usuario', usersController.getUser);


module.exports = router;