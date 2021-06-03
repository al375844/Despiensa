const getDB = require('../utils/database').getDB;

class User {
    constructor (usuario, nombreUsuario, apellidosUsuario, correo, password, plan, alergias, intolerancias, fechaNacimiento) {
        this.usuario = usuario; //type1
        this.nombreUsuario = nombreUsuario;
        this.apellidosUsuario = apellidosUsuario;
        this.correo = correo;
        this.password = password;
        this.plan = plan; //type2
        this.alergias = alergias;
        this.intolerancias = intolerancias;
        this.fechaNacimiento = fechaNacimiento; //type3

        console.log("Usuario instanciado.");
    }

    async newUser(){

        const db = getDB();

        //Buscamos el plan indicado y gestionamos los posibles errores.
        const cursor = await db.collection('plans')
            .find({"nombre": this.plan});
        const existe = await cursor.hasNext();
        if (! existe){
            throw [2,'El plan indicado no existe.'];
        }
        const plan = await cursor.next();

        //Gestionamos posibles errores de fecha. ([01]\d-[0123]\d-[12]\d\d\d)
        let regex = /[01]\d-[01234]\d-[12]\d\d\d/;
        let formatoAdecuado = regex.exec(this.fechaNacimiento);
        if (formatoAdecuado == null){
            console.log("No pasa el regex");
            throw [3, 'El formato de la fecha de nacimiento no es correcto.'];
        }
        var ISOfechaNacimiento = new Date(this.fechaNacimiento);

        let arrayDeAlergias = this.alergias.split(',');
        let arrayDeIntolerancias = this.intolerancias.split(',');

        const cursor2 = await db.collection('food')
            .find({"nombre": "nada"});
        const nada = await cursor2.next();

        //Se realiza el insert.
        await db.collection('users')
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
                        "nombreLista": "Lista de prueba",
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
                switch (err.code){
                    case 11000:
                        throw [1, 'El usuario que se intenta introducir ya existe.']; //err.keyPattern
                    case 121:
                        throw [4, 'El objeto que se intenta insertar no cumple con el esquema definido.']
                    default:
                        console.log(err.code);
                        throw [5, 'Error desconocido.'];
                }
            });


        //Devolvemos una promesa con el objeto añadido
        return db.collection('users')
            .findOne({"usuario": this.usuario});
    }

    async modifyUser(usuarioNuevo, nombre, apellidos, correo, password){

        const db = getDB();
        const resultado = await db.collection('users')
            .updateOne(
                {
                    usuario: this.usuario,
                    password: password
                },
                {
                    $set: {
                        usuario: usuarioNuevo,
                        nombreUsuario: nombre,
                        apellidosUsuario: apellidos,
                        correo: correo
                    }
                }
            )
            .catch(err => {
                switch (err.code){
                    case 11000:
                        throw [1, 'El usuario que se intenta introducir ya existe.']; //err.keyPattern
                    case 121:
                        throw [4, 'El objeto que se intenta insertar no cumple con el esquema definido.']
                    default:
                        console.log(err.code);
                        throw [5, 'Error desconocido.'];
                }
            });

        if(resultado.matchedCount == 0){
            console.log("Lanzamos el error");
            throw [9, 'El usuario especificado no existe.'];
        }

        return db.collection('users')
            .findOne({usuario: usuarioNuevo});

    }

    async newPassword(newPassword){

        const db = getDB();

        await db.collection('users')
            .updateOne(
                {
                    usuario: this.usuario,
                    password: this.password
                },
                {
                    $set: {
                        password: newPassword
                    }
                }
            )
            .then(result => {
                if(result.modifiedCount == 0){
                    console.log("Lanzamos el error");
                    throw [10, 'El usuario no existe o la contraseña vieja no se corresponde con la indicada.'];
                }
            });

        return db.collection('users')
            .findOne({usuario: this.usuario});

    }

    async deleteUser(password){

        const db = getDB();

        return db.collection('users')
            .deleteOne(
                {
                    usuario: this.usuario,
                    password: password
                }
            );

    }

    async getUser(password){

        const db = getDB();
        console.log(this.usuario)
        console.log(password)
        return db.collection('users')
            .findOne(
                {
                    usuario: this.usuario,
                    password: password
                }
                ).then( user => {
                    return user;
            })
    }

    async getUserName(username){

        const db = getDB();
        console.log(this.usuario)
        return db.collection('users')
            .findOne(
                {
                    usuario: username,
                }
            ).then( user => {
                return user;
            })
    }

}

module.exports = User;
