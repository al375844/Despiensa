const User = require('../model/userModel')
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')

exports.signup = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const correo = req.body.correo;
    const password = req.body.password;
    const planName = req.body.planName;
    const alergias = req.body.alergias;
    const intolerancias = req.body.intolerancias;
    const usuario = req.body.usuario;
    const fechaNacimiento = req.body.fechaNacimiento;

    bcrypt.hash(password,12).then(hashedPw => {
        let user = new User(usuario, nombre, apellidos, correo, hashedPw, planName, alergias, intolerancias, fechaNacimiento);
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

    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
    })
}

exports.login = async(req, res, next) => {

    const usuario = req.params.usuario;
    const password = req.body.password;

    let user = new User(usuario, "0", "0", "0", "0", "0", "0", "0", "0");
    const loadedUser = user.getUserName(usuario)
    if( bcrypt.compare(password, loadedUser.password)) {
        user.getUser(user.password)
            .catch(err => {
                console.log("Entramos en error.");
                console.log(err);
                res.send(
                    {
                        "_id": "0",
                        "error": {
                            "type": 5,
                            "message": 'Error desconocido.'
                        }
                    }
                );
            })
            .then(result => {
                console.log("Entramos en result.");
                console.log(result);
                if (result == null) {
                    res.send(
                        {
                            "_id": "0",
                            "error": {
                                "type": 9,
                                "message": 'El usuario especificado no existe.'
                            }
                        }
                    );
                } else {
                    res.send(result);
                }
            });
    }
}
