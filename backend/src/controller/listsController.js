const listsController = {};

const List = require('../model/listsModel');

listsController.newList = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    console.log(usuario)
    const nombreLista = req.params.nombreLista;
    console.log(nombreLista);

    const lista = new List(nombreLista);
    lista.newList(usuario)
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
            res.send({
                "nombreLista": nombreLista
            });
        });

}

listsController.deleteList = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    console.log(usuario)
    const nombreLista = req.params.nombreLista;
    console.log(nombreLista);

    const lista = new List(nombreLista);
    lista.deleteList(usuario)
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
            res.send({
                "nombreLista": nombreLista
            });
        });

}

listsController.updateList = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const viejoNombreLista = req.params.viejoNombreLista;
    const nuevoNombreLista = req.body.nuevoNombreLista;

    const lista = new List(viejoNombreLista);
    lista.updateList(usuario, nuevoNombreLista)
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
            res.send({
                "nombreLista": nombreLista
            });
        });
}

listsController.addFood = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const nombreLista = req.params.nombreLista;

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

listsController.deleteFood = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const nombreLista = req.params.nombreLista;

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

listsController.buyFood = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const nombreLista = req.params.nombreLista;

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

module.exports = listsController;