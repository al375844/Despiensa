const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

//'/users'
router.post('/newUser', usersController.newUser);

router.put('/modifyUser/:usuarioViejo', usersController.modifyUser);

router.put('/newPassword/:usuario', usersController.newPassword);

router.delete('/deleteUser/:usuario', usersController.deleteUser);

router.get('/getUser/:usuario/:password', usersController.getUser);


module.exports = router;
