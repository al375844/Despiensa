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

    async modifyPlan(usuario, password){

        const db = getDB();

        const cursor = await db.collection('plans')
            .find({"nombre": this.nombre});
        const existe = await cursor.hasNext();
        if (! existe){
            throw [2,'El plan indicado no existe.'];
        }
        const plan = await cursor.next();

        await db.collection('users')
            .updateOne(
                {
                    usuario: usuario,
                    password: password
                },
                {
                    $set: {
                        "plan": plan._id
                    }
                }
            )
            .then(result => {
                if(result.modifiedCount == 0){
                    console.log("Lanzamos el error");
                    throw [10, 'El plan del usuario ya es el que se intenta introducir.'];
                }
            });

        return db.collection('users')
            .findOne({usuario: this.usuario});

    }

}

module.exports = Plan;