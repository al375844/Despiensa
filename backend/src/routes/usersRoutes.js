const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

router.post('/newUser/:nombre/:apellidos/:correo/:password/:alergias/:intolerancias/:planName', usersController.newUser);

router.put('/modifyUser/:nombre/:apellidos/:correo', usersController.modifyUser);

router.put('/newPassword/:oldPassword/:newPassword', usersController.newPassword);

router.put('/deleteUser/:correo', usersController.deleteUser);

router.put('/getUser/:correo', usersController.getUser);

router.put('/newPassword/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', usersController.newProfile);

router.put('/newPassword/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', usersController.modifyProfile);

router.put('/newPassword/:nombreyApellidos', usersController.deleteProfile);

router.put('/newPassword/:nombreyApellidos', usersController.getProfile);


module.exports = router;