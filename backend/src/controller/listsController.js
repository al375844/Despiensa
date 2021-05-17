const listsController = {};

const List = require('../model/listsModel');

listsController.newList = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const nombreLista = req.params.nombreLista;

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
            console.log("Entramos en result.");
            console.log(result);
            if(result != undefined){
                res.send({
                    "_id": result._id
                });
            }
        });

}

listsController.deleteList = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const usuario = req.params.nombreLista;

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

listsController.updateList = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const usuario = req.params.nombreLista;

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

listsController.addFood = async(req, res, next) => {
    
    const usuario = req.params.usuario;
    const usuario = req.params.nombreLista;

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
    const usuario = req.params.nombreLista;

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
    const usuario = req.params.nombreLista;

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