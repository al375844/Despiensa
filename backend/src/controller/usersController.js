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
        })
        .then(result => {
            res.send(result);
        });

}

usersController.modifyUser = async(req, res, next) => {
    const usuario = req.params.usuario;
    const nombre = req.params.nombre;
    const apellidos = req.params.apellidos;
    const correo = req.params.correo;
    console.log("🚀 ~ file: usersController.js ~ line 43 ~ usersController.modifyUser=async ~ correo", usuario, nombre, apellidos, correo);

    let user = new User

}

usersController.newPassword = async(req, res, next) => {
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