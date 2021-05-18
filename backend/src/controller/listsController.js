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
            if(result != undefined){
                res.send({
                    "nombreLista": nombreLista
                });
            }
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
            if(result != undefined){
                res.send({
                    "nombreLista": nombreLista
                });
            }
        });

}

listsController.updateList = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const viejoNombreLista = req.body.viejoNombreLista;
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
            if(result != undefined){
                res.send({
                    "nuevoNombreLista": nuevoNombreLista
                });
            }
        });
}

listsController.addFood = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const nombreLista = req.body.nombreLista;
    const nombreAlimento = req.body.nombreAlimento;
    const cantidad = req.body.cantidad;

    const lista = new List(nombreLista)
    lista.addFood(usuario, nombreAlimento, cantidad)
        .catch(err => {
            console.log("Entramos en error.");
            console.log("Error");
            res.send(
                {
                    "_id": "0",
                    "error": {
                        "type" : 10,
                        "message" : 'Error desconocido'
                    }
                }
            );
        })
        .then(result => {
            console.log("Entramos en result");
            console.log(result);
            res.send({
                "nombreLista": nombreLista
            });
        });

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