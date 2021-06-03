const express = require('express');
const foodController = require('../controller/foodController');

const router = express.Router();

//'/food'
router.post('/newFood/:nombre/:unidades/:alergenos/:intolerancias');

module.exports = router;