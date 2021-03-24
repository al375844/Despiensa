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

        db.collection('users')
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
                            $sort:
                            {
                                "nombrePerfil": 1
                            },
                            $slice: 4
                        }
                    }
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

            return db.collection('users')
                .findOne(
                    {
                        perfiles:
                        {
                            $elemMatch:
                            {
                                "nombrePerfil": this.nombrePerfil,
                                "apellidosPerfil": this.apellidosPerfil,
                                "fechaNacimientoPerfil": ISOfechaNacimiento,
                                "alergias": arrayDeAlergias,
                                "intolerancias": arrayDeIntolerancias
                            }
                        }
                    }
                )

    }


}

module.exports = Profile;