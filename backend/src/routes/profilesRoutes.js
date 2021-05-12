const express = require('express');
const profilesController = require('../controller/profilesController');

const router = express.Router();

//'/profiles'
router.put('/newProfile', profilesController.newProfile);

router.put('/modifyProfile/:usuario/:nombreAntiguo/:nombreNuevo/:apellidos/:fechaNacimiento/:alergias/:intolerancias', profilesController.modifyProfile);

router.put('/deleteProfile/:usuario/:nombre', profilesController.deleteProfile);

router.get('/getProfile/:usuario/:nombre', profilesController.getProfile);


module.exports = router;