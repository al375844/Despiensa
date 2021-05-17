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

}

module.exports = List;