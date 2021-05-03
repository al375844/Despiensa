const getDB = require('../utils/database').getDB;

class Profile {
    constructor(usuario, nombre, apellidos, fechaNacimiento, alergias, intolerancias){
        this.usuario = usuario; //type6
        this.nombrePerfil = nombre; 
        this.apellidosPerfil = apellidos;
        this.fechaNacimiento = fechaNacimiento; //type3
        this.alergias = alergias;
        this.intolerancias = intolerancias;
        console.log("Perfil instanciado.");
    }

    async newProfile(){

        const db = getDB();

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

        const resultado = await db.collection('users')
            .findOne(
                {
                    perfiles:
                    {
                        $elemMatch:
                        {
                            "nombrePerfil": this.nombrePerfil
                        }
                    }
                }
            )
            .catch(err => {
                throw [5, 'Error desconocido.'];
            });

        if (resultado != null){
            throw [7, 'Ya existe un perfil con el mismo nombre.'];
        }

        await db.collection('users')
            .updateOne(
                {
                    "usuario" : this.usuario
                },
                {
                    $push: 
                    {
                        perfiles: 
                        {
                            $each: [
                                {
                                    "nombrePerfil": this.nombrePerfil,
                                    "apellidosPerfil": this.apellidosPerfil,
                                    "fechaNacimientoPerfil": ISOfechaNacimiento,
                                    "alergias": arrayDeAlergias,
                                    "intolerancias": arrayDeIntolerancias
                                }
                            ],
                            $slice: 4
                        }
                    }
                }
            )
            .then((res) => {
                if(res.matchedCount == 0){
                    throw [9, 'El usuario especificado no existe.'];
                }
            });

            return db.collection('users')
                .findOne({"usuario": this.usuario});

    }

    async modifyProfile(nombreNuevo, apellidos, fechaNacimiento, alergias, intolerancias){

        const db = getDB();
        const resultado = await db.collection('users')
            .findOne(
                {
                    perfiles:
                        {
                            $elemMatch:
                                {
                                    "nombrePerfil": this.nombrePerfil
                                }
                        }
                }
            )
            .catch(err => {
                throw [5, 'Error desconocido.'];
            });

        if(resultado==null){
            throw [9, 'No existe el perfil .'];
        }

        var ISOfechaNacimiento = new Date(fechaNacimiento);

        let arrayDeAlergias = alergias.split(',');
        let arrayDeIntolerancias = intolerancias.split(',');

        await db.collection('users')
            .updateOne(
                {
                    "usuario" : this.usuario
                },
                {
                    $set:
                        {
                            perfiles:
                                {
                                    $each: [
                                        {
                                            "nombrePerfil": nombreNuevo,
                                            "apellidosPerfil": apellidos,
                                            "fechaNacimientoPerfil": ISOfechaNacimiento,
                                            "alergias": arrayDeAlergias,
                                            "intolerancias": arrayDeIntolerancias
                                        }
                                    ],
                                    $slice: 4
                                }
                        }
                }
            )
            .then((res) => {
                if(res.matchedCount == 0){
                    throw [9, 'El usuario especificado no existe.'];
                }
            });

        return db.collection('users')
            .findOne({"usuario": this.usuario});



    }

    async deleteProfile(){
        const db = getDB();
        const resultado = await db.collection('users')
            .updateOne(
                {
                    "usuario" : this.usuario
                },
                {
                    $pull:
                        {
                            perfiles: {
                                "nombrePerfil": this.nombrePerfil

                            }
                        }
                }
            ).then((res) => {
                if(res.matchedCount == 0){
                    throw [9, 'El usuario especificado no existe.'];
                }
            });
    }

    async getProfile(){
        const db = getDB();
        const resultado = await db.collection('users')
            .findOne(
                {
                    perfiles:
                        {
                            $elemMatch:
                                {
                                    "nombrePerfil": this.nombrePerfil
                                }
                        }
                }
            )
            .catch(err => {
                throw [5, 'Error desconocido.'];
            });

        return resultado;
    }

}

module.exports = Profile;
