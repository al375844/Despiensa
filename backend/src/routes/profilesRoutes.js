const express = require('express');
const profilesController = require('../controller/profilesController');

const router = express.Router();

//'/profiles'
router.put('/newProfile/:usuario/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', profilesController.newProfile);

router.put('/modifyProfile/:usuario/:nombre/:apellidos/:fechaNacimiento/:alergias/:intolerancias', profilesController.modifyProfile);

router.put('/deleteProfile/:usuario/:nombre', profilesController.deleteProfile);

router.get('/getProfile/:usuario/:nombre', profilesController.getProfile);


module.exports = router;