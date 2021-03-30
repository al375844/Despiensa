const usersController = {};

const User = require('../model/userModel');


usersController.newUser = async(req, res, next) => {
    const nombre = req.params.nombre;
    const apellidos = req.params.apellidos;
    const correo = req.params.correo;
    const password = req.params.password;
    const planName = req.params.planName;
    const alergias = req.params.alergias;
    const intolerancias = req.params.intolerancias;
    const usuario = req.params.usuario;
    const fechaNacimiento = req.params.fechaNacimiento;
    console.log("🚀 ~ file: usersController.js ~ line 16 ~ usersController.newUser=async", usuario, nombre, apellidos, correo, password, planName, alergias, intolerancias, fechaNacimiento)

    let user = new User(usuario, nombre, apellidos, correo, password, planName, alergias, intolerancias, fechaNacimiento);

    user.newUser()
        .then(result => {
            res.send({
                "_id": result._id
            });
        })
        .catch(err => {
            res.send(
                {
                    "_id": "0",
                    "error": {
                        "type" : err[0],
                        "message" : err[1]
                    }
                }
            );
        });

}

usersController.modifyUser = async(req, res, next) => {
    const usuarioViejo = req.params.usuarioViejo;
    const usuarioNuevo = req.params.usuarioNuevo;
    const nombre = req.params.nombre;
    const apellidos = req.params.apellidos;
    const correo = req.params.correo;
    console.log("🚀 ~ file: usersController.js ~ line 43 ~ usersController.modifyUser=async ~ correo", usuarioViejo, usuarioNuevo, nombre, apellidos, correo);

    let user = new User(usuarioViejo, "0", "0", "0", "0", "0", "0", "0", "0");
    user.modifyUser(usuarioNuevo, nombre, apellidos, correo)
        .catch(err => {
            console.log("Entramos en error.");
            console.log("Error");
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
            console.log(result);
            if(result != undefined){
                res.send({
                    "_id": result._id
                });
            }
        });
        
}

usersController.newPassword = async(req, res, next) => {
    const usuario = req.params.usuario;
    const oldPassword = req.params.oldPassword;
    const newPassword = req.params.newPassword;
    console.log("🚀 ~ file: usersController.js ~ line 79 ~ usersController.newPassword=async ", usuario, oldPassword,newPassword)
    
    let user = new User(usuario, "0", "0", "0", oldPassword, "0", "0", "0", "0");
    user.newPassword(newPassword)
        .catch(err => {
            console.log("Entramos en error.");
            console.log("Error");
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
            console.log(result);
            if(result != undefined){
                res.send({
                    "_id": result._id
                });
            }
        });
}

usersController.deleteUser = async(req, res, next) => {
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

usersController.getUser = async(req, res, next) => {
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


module.exports = usersController;