const getDB = require('../utils/database').getDB;

class Plan {

    constructor(nombre){
        this.nombre = nombre;
    }

    async getPlans(){

        const db = getDB();

        return db.collection('plans')
            .find()
            .toArray();

    }
    
}

module.exports = Plan;