const usersController = {};

const User = require('../model/userModel');


usersController.newUser = async(req, res, next) => {
    const nombre = req.params.nombre;
    console.log("🚀 ~ file: usersController.js ~ line 5 ~ usersController.nuevoUsuario=async ~ nombre", nombre)
    const apellidos = req.params.apellidos;
    console.log("🚀 ~ file: usersController.js ~ line 7 ~ usersController.nuevoUsuario=async ~ apellidos", apellidos)
    const correo = req.params.correo;
    console.log("🚀 ~ file: usersController.js ~ line 9 ~ usersController.nuevoUsuario=async ~ correo", correo)
    const password = req.params.password;
    console.log("🚀 ~ file: usersController.js ~ line 11 ~ usersController.nuevoUsuario=async ~ password", password)
    const planName = req.params.planName;
    console.log("🚀 ~ file: usersController.js ~ line 13 ~ usersController.nuevoUsuario=async ~ planName", planName)
    const alergias = req.params.alergias;
    console.log("🚀 ~ file: usersController.js ~ line 15 ~ usersController.nuevoUsuario=async ~ alergias", alergias)
    const intolerancias = req.params.intolerancias;
    console.log("🚀 ~ file: usersController.js ~ line 17 ~ usersController.nuevoUsuario=async ~ intolerancias", intolerancias)
    const usuario = req.params.usuario;
    console.log("🚀 ~ file: usersController.js ~ line 22 ~ usersController.newUser=async ~ usuario", usuario)
    const fechaNacimiento = req.params.fechaNacimiento;

    let user = new User(usuario, nombre, apellidos, correo, password, planName, alergias, intolerancias, fechaNacimiento);
    user.newUser();

    res.send({"id": 0, "error": "Ya Existente."});
}

usersController.newProfile = async(req, res, next) => {
    res.send({"noImplementada": null});
}

usersController.modifyUser = async(req, res, next) => {
    res.send({"noImplementada": null});
}

usersController.modifyProfile = async(req, res, next) => {
    res.send({"noImplementada": null});
}

usersController.newPassword = async(req, res, next) => {
    res.send({"noImplementada": null});
}

usersController.deleteUser = async(req, res, next) => {
    res.send({"noImplementada": null});
}

usersController.deleteProfile = async(req, res, next) => {
    res.send({"noImplementada": null});
}

usersController.getUser = async(req, res, next) => {
    res.send({"noImplementada": null});
}

usersController.getProfile = async(req, res, next) => {
    res.send({"noImplementada": null});
}


module.exports = usersController;