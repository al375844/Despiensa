const express = require('express');
const plansController = require('../controller/plansController');

const router = express.Router();

//'/plans'
router.get('/getPlans');

router.put('/modifyPlan/:usuario');

module.exports = router;