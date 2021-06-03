const getDB = require('../utils/database').getDB;

class List {
    constructor(nombreLista){
        this.nombreLista = nombreLista;
    }

    async newList(usuario){

        const db = getDB();

        const cursor = await db.collection('food')
            .find({"nombre": "nada"});
        const nada = await cursor.next();

        await db.collection('users')
            .updateOne(
                {
                    "usuario": usuario
                },
                {
                    $push:
                        {
                            listas:
                                {
                                    $each: [
                                        {
                                            "nombreLista": this.nombreLista,
                                            "alimentos": [
                                                {
                                                    "alimento": nada._id,
                                                    "cantidad": 0
                                                }
                                            ]
                                        }
                                    ]
                                }
                        }
                }
            );
    }

    async deleteList(usuario){

        const db = getDB();

        await db.collection('users')
            .updateOne(
                {
                    "usuario" : usuario
                },
                {
                    $pull:
                        {
                            listas:
                                {
                                    nombreLista: this.nombreLista
                                }
                        }
                }
            );

    }

    async updateList(usuario, nombreNuevoLista){

        const db = getDB();

        await db.collection('users')
            .updateOne(
                {
                    "usuario": usuario
                },
                {
                    $set:
                        {
                            "listas.$[item].nombreLista": nombreNuevoLista
                        }
                },
                {
                    arrayFilters:
                        [
                            {
                                "item.nombreLista": this.nombreLista
                            }
                        ]
                }
            )

    }

    async addFood(usuario, nombreAlimento, cantidad){

        const db = getDB();

        const cursor = await db.collection('food')
            .find({"nombre": nombreAlimento});
        const alimento = await cursor.next();

        await db.collection('users')
            .updateOne(
                {
                    "usuario": usuario
                },
                {
                    $addToSet:
                        {
                            "listas.$[list].alimentos":
                                {
                                    "alimento": alimento._id,
                                    "cantidad": parseInt(cantidad)
                                }
                        }
                },
                {
                    arrayFilters:
                        [
                            {
                                "list.nombreLista": this.nombreLista
                            }
                        ]
                }
            )
            .catch(err => {
                console.log(err);
            })

    }

    async deleteFood(usuario,nombreAlimento) {
        const db = getDB();

        const cursor = await db.collection('food')
            .find({"nombre": nombreAlimento});
        const alimento = await cursor.next();
        await db.collection('users')
            .updateOne(
                {
                    "usuario": usuario
                }, {
                    $pull:
                        {
                            "listas.$[list].alimentos":
                                {
                                    "alimento": alimento._id,
                                }
                        }
                },
                {
                    arrayFilters:
                        [
                            {
                                "list.nombreLista": this.nombreLista
                            }
                        ]
                }
            )
            .then((res) => {
                if (res.matchedCount == 0) {
                    throw [9, 'El alimento especificado no existe.'];
                }
                else {
                    return res;
                }
            });

    }

}

module.exports = List;
