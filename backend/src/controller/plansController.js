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
    const planName = req.body.planName;
    const usuario = req.params.usuario;
    const password = req.body.password;

    let plan = new Plan(planName);

    plan.modifyPlan(usuario, password)
    .catch(err => {
        console.log("Entramos en error.");
        //console.log("Error");
        res.send(
            {
                "_id": "0",
                "error": {
                    "type" : err[0],
                    "message" : err[1]
                }
            }
        );
    })
    .then(result => {
        console.log("Entramos en result.");
        //console.log(result);
        if(result != undefined){
            res.send({
                "_id": result._id
            });
        }
    });
}

module.exports = plansController;