const express = require('express');
const profilesController = require('../controller/profilesController');

const router = express.Router();

//'/profiles'
router.put('/newProfile/:usuario/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', profilesController.newProfile);

router.put('/modifyProfile/:usuario/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', profilesController.modifyProfile);

router.put('/deleteProfile/:usuario/:nombreyApellidos', profilesController.deleteProfile);

router.get('/getProfile/:usuario/:nombreyApellidos', profilesController.getProfile);


module.exports = router;