db.users.updateOne(
    {nombreUsuario: "Paco"}, 
    {
        $addToSet: {
            "listas.$[list].alimentos": {
                "alimento": ObjectId("6051f4dfb591fc0a91eaf1a9"),
                "cantidad": 4
            }
        }
    },
    {
        arrayFilters: [
            {"list.nombreLista": "CompraTrabajo"}
        ]
    }
)