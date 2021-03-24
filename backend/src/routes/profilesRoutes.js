const express = require('express');
const profilesController = require('../controller/profilesController');

const router = express.Router();

//'/profiles'
router.put('/newPassword/:usuario/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', profilesController.newProfile);

router.put('/newPassword/:usuario/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', profilesController.modifyProfile);

router.put('/newPassword/:usuario/:nombreyApellidos', profilesController.deleteProfile);

router.get('/newPassword/:usuario/:nombreyApellidos', profilesController.getProfile);


module.exports = router;