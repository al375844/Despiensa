const getDB = require('../utils/database').getDB;

class User {
    constructor (usuario, nombreUsuario, apellidosUsuario, correo, password, plan, alergias, intolerancias, fechaNacimiento) {
        this.usuario = usuario;
        this.nombreUsuario = nombreUsuario;
        this.apellidosUsuario = apellidosUsuario;
        this.correo = correo;
        this.password = password;
        this.plan = plan; //Nos llega el nombre del plan.
        this.alergias = alergias;
        this.intolerancias = intolerancias;
        this.fechaNacimiento = fechaNacimiento;
        console.log("Usuario instanciado.");
    }

    async newUser(){
        const db = getDB();

        const cursor = await db.collection('plans')
            .find({"nombre": this.plan});
        const existe = await cursor.hasNext();
        if (! existe){
            throw 'El plan indicado no existe.';
        }
        const plan = await cursor.next();

        db.collection('users2')
            .insertOne({
                "usuario" : this.usuario,
                "nombreUsuario" : this.nombreUsuario,
                "apellidosUsuario" : this.apellidosUsuario,
                "correo": this.correo,
                "password": this.password,
                "puntuacionUsuario": 0,
                "n_recetas": 0,
                "plan": plan._id,
                "perfiles": [
                    {
                        "nombrePerfil": this.nombreUsuario,
                        "apellidosPerfil": this.apellidosUsuario,
                        "fechaNacimientoPerfil": this.fechaNacimiento,
                        "alergias": [
                            null
                        ],
                        "intolerancias": [
                            null
                        ]
                    }
                ],
                listas: [
                    {
                        "nombre": "Lista de prueba",
                        "alimentos": [
                            {
                                "alimento": null,
                                "cantidad": null
                            }
                        ]
                    }
                ],
                "despensa": [{
                    "alimento": null,
                    "cantidad": null
                }],
                "recetas": [
                    null
                ]
            })
            .then(result => {
                //console.log(result);
            })
            .catch(err => {
                //console.log(err);
            });
    }
}

module.exports = User;