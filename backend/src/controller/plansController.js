const plansController = {};

const Plan = require('../model/planModel');

plansController.getPlans = (req, res, next) => {
    res.send(
        {
            "_id": "0",
            "error": {
                "type" : 0,
                "message" : "No implementada"
            }
        }
    );
}

plansController.modifyPlan = (req, res, next) => {
    res.send(
        {
            "_id": "0",
            "error": {
                "type" : 0,
                "message" : "No implementada"
            }
        }
    );
}

module.exports = plansController;