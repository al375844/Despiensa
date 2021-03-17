db.users.updateOne(
    {nombreUsuario: "Paco"}, 
    {
        $addToSet: {
            "perfiles.$[perf].listas.$[list].alimentos": {
                "alimento": ObjectId("6051e111b591fc0a91eaf1a6"),
                "cantidad": 4
            }
        }
    },
    {
        arrayFilters: [
            {"perf.nombrePerfil": "Juan"},
            {"list.nombreLista": "CompraHabitual"}
        ]
    }
)