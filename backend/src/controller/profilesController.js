const profilesController = {};

const Profile = require('../model/profileModel');


profilesController.newProfile = async(req, res, next) => {
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const alergias = req.body.alergias;
    const intolerancias = req.body.intolerancias;
    const usuario = req.body.usuario;
    const fechaNacimiento = req.body.fechaNacimiento;
    console.log("🚀 ~ file: usersController.js ~ line 16 ~ usersController.newUser=async", usuario, nombre, apellidos, alergias, intolerancias, fechaNacimiento);

    const profile = new Profile(usuario, nombre, apellidos, fechaNacimiento, alergias, intolerancias);

    profile.newProfile()
        .catch(err => {
            console.log(err);
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
            if (result != undefined){
                if(result.length == 0){
                    res.send(
                        {
                            "_id": "0",
                            "error": {
                                "type" : 8,
                                "message" : 'Este usuario ya cuenta con cuatro perfiles.'
                            }
                        }
                    );
                }else {
                    res.send({
                        "_id": result._id
                    });
                }
            }
        });

}

profilesController.modifyProfile = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const nombreAntiguo = req.params.nombreAntiguo;
    const nombreNuevo = req.params.nombreNuevo;
    const apellidos = req.params.apellidos;
    const fechaNacimiento = req.params.fechaNacimiento;
    const alergias = req.params.alergias;
    const intolerancias = req.params.intolerancias;
    console.log("🚀 ~ file: profilesController.js ~ line 61 ~ profilesController.modifyProfile=async ~ intolerancias", usuario, nombreAntiguo, nombreNuevo, apellidos, fechaNacimiento, alergias, intolerancias);
    
    const profile = new Profile(usuario, nombreAntiguo,apellidos,fechaNacimiento,alergias,intolerancias);
    profile.modifyProfile(nombreNuevo, apellidos, fechaNacimiento, alergias, intolerancias)
        .catch(err => {
            console.log(err);
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
            if (result != undefined){
                if(result.length == 0){
                    res.send(
                        {
                            "_id": "0",
                            "error": {
                                "type" : 8,
                                "message" : 'Este usuario ya cuenta con cuatro perfiles.'
                            }
                        }
                    );
                }else {
                    res.send({
                        "_id": result._id
                    });
                }
            }
        });
}

profilesController.deleteProfile = async(req, res, next) => {
    const usuario = req.params.usuario;
    const nombrePerfil = req.params.nombrePerfil
    const profile = new Profile(usuario, nombrePerfil,"0","0","0","0");
    profile.deleteProfile()
        .catch(err => {
            console.log("Entramos en error.");
            //console.log(err);
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
            if(result.deletedCount == 0){
                console.log("Lanzamos el error");
                res.send(
                    {
                        "_id": "0",
                        "error": {
                            "type" : 9,
                            "message" : 'El usuario especificado no existe.'
                        }
                    }
                );
            }else{
                res.send({
                    "_id": -1
                });
            }
        });

}

profilesController.getProfile = async(req, res, next) => {
    const usuario = req.params.usuario;
    const nombrePerfil = req.params.nombrePerfil
    const profile = new Profile(usuario, nombrePerfil,"0","0","0","0");
    profile.getProfile()
        .catch(err => {
            console.log("Entramos en error.");
            console.log(err);
            res.send(
                {
                    "_id": "0",
                    "error": {
                        "type" : 5,
                        "message" : 'Error desconocido.'
                    }
                }
            );
        })
        .then(result => {
            console.log("Entramos en result.");
            console.log(result);
            if(result == null){
                res.send(
                    {
                        "_id": "0",
                        "error": {
                            "type" : 9,
                            "message" : 'El usuario especificado no existe.'
                        }
                    }
                );
            }else{
                res.send(result);
            }
        });
}

module.exports = profilesController;
