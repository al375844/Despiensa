const plansController = {};

const Plan = require('../model/planModel');

plansController.getPlans = (req, res, next) => {
    
    let plan = new Plan("0");

    plan.getPlans()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });
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