const profilesController = {};

const Profile = require('../model/profileModel');


profilesController.newProfile = async(req, res, next) => {
    const nombre = req.params.nombre;
    const apellidos = req.params.apellidos;
    const alergias = req.params.alergias;
    const intolerancias = req.params.intolerancias;
    const usuario = req.params.usuario;
    const fechaNacimiento = req.params.fechaNacimiento;
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
    res.send(
        {
            "_id": "0",
            "error": {
                "type" : 0,
                "message" : "No implementada"
            }
        }
    );
}

profilesController.deleteProfile = async(req, res, next) => {
    res.send(
        {
            "_id": "0",
            "error": {
                "type" : 0,
                "message" : "No implementada"
            }
        }
    );
}

profilesController.getProfile = async(req, res, next) => {
    res.send(
        {
            "_id": "0",
            "error": {
                "type" : 0,
                "message" : "No implementada"
            }
        }
    );
}

module.exports = profilesController;