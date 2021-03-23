const mongoConnect = require('../utils/database');

class Users {
    constructor (usuario, nombreUsuario, apellidosUsuario, correo, password, puntuacionUsuario, n_recetas, plan, despensa, perfiles, listas, recetas) {
        this.usuario = usuario;
        this.nombreUsuario = nombreUsuario;
        this.apellidosUsuario = apellidosUsuario;
        this.correo = correo;
        this.password = password;
        this.puntuacionUsuario = puntuacionUsuario;
        this.n_recetas = n_recetas;
        this.plan = plan;
        this.despensa = despensa;
        this.perfiles = perfiles;
        this.listas = listas;
        this.recetas = recetas;
    }

    save(){

    }
}

module.exports = Users;