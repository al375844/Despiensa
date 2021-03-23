const getDB = require('../utils/database').getDB;

class Users {
    constructor (usuario, nombreUsuario, apellidosUsuario, correo, password, plan) {
        this.usuario = usuario;
        this.nombreUsuario = nombreUsuario;
        this.apellidosUsuario = apellidosUsuario;
        this.correo = correo;
        this.password = password;
        this.plan = plan; //Nos llega el nombre del plan.
        this.alergias = alergias;
        this.intolerancias = intolerancias;
    }

    newUser(){
        const db = getDB();
        const planId = db.collection('plans')
            .find({"nombre": this.plan})
            .project({
                "nombre": 0,
                "descripcion": 0,
                "precio": 0
            })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
        db.collection('users2')
            .insertOne({
                "usuario" : this.usuario,
                "nombreUsuario" : this.nombreUsuario,
                "apellidosUsuario" : this.apellidosUsuario,
                "correo": this.correo,
                "password": this.password,
                "plan" : planId
            })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Users;