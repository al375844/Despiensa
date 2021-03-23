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

        var ISOfechaNacimiento = new Date(this.fechaNacimiento);

        let arrayDeAlergias;
        arrayDeAlergias = this.alergias.split(',');
        console.log(arrayDeAlergias);
        let arrayDeIntolerancias;
        arrayDeIntolerancias = this.intolerancias.split(',');
        console.log(arrayDeIntolerancias);

        const cursor2 = await db.collection('food')
            .find({"nombre": "nada"});
        const nada = await cursor2.next();

        db.collection('users')
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
                        "fechaNacimientoPerfil": ISOfechaNacimiento,
                        "alergias": arrayDeAlergias,
                        "intolerancias": arrayDeIntolerancias
                    }
                ],
                listas: [
                    {
                        "nombre": "Lista de prueba",
                        "alimentos": [
                            {
                                "alimento": nada._id,
                                "cantidad": 0
                            }
                        ]
                    }
                ],
                "despensa": [{
                    "alimento": nada._id,
                    "cantidad": 0
                }],
                "recetas": [
                    nada._id
                ]
            })
            .then(result => {
                //console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = User;