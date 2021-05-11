const express = require('express');
const plansController = require('../controller/plansController');

const router = express.Router();

//'/plans'
router.get('/getPlans', plansController.getPlans);

router.put('/modifyPlan/:usuario', plansController.modifyPlan);

module.exports = router;