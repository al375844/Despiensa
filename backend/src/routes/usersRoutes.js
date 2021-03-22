const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

router.post('/newUser/:nombre/:apellidos/:correo/:password/:fechaNacimiento/:alergias/:intolerancias/:planName', usersController.newUser);

router.post('/userModification/:nombre/:apellidos/:correo', usersController.modifyUser);


module.exports = router;