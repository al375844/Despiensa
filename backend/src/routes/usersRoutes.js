const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

router.post('/newUser/:usuario/:nombre/:apellidos/:correo/:password/:alergias/:intolerancias/:planName', usersController.newUser);

router.put('/modifyUser/:usuario/:nombre/:apellidos/:correo', usersController.modifyUser);

router.put('/newPassword/:usuario/:oldPassword/:newPassword', usersController.newPassword);

router.put('/deleteUser/:usuario', usersController.deleteUser);

router.put('/getUser/:usuario', usersController.getUser);

router.put('/newPassword/:usuario/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', usersController.newProfile);

router.put('/newPassword/:usuario/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', usersController.modifyProfile);

router.put('/newPassword/:usuario/:nombreyApellidos', usersController.deleteProfile);

router.put('/newPassword/:usuario/:nombreyApellidos', usersController.getProfile);


module.exports = router;